import {ChangeEvent, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getTaskById, updateTaskStatus} from '@/api/TaskAPI';
import {toast} from 'react-toastify';
import {formatDate, statusList} from '@/helpers/helpers';
import {TaskStatus} from '@/interfaces/index';
import {NotesPanel} from '../notes/NotesPanel';
export default function TaskModalDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!;

  const showModalTasks = taskId ? true : false;
  const {data, isError, error} = useQuery({
    queryKey: ['taskDetails', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId, //*enable the query only if the taskId is present
    retry: false,
  });
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: updateTaskStatus,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['editProject', projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ['taskDetails', taskId],
      });
      toast.success(data);
      navigate(location.pathname, {replace: true});
    },
  });

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const data = {projectId, taskId, status};
    mutate(data);
  };

  // console.log(data);
  // console.log(isError, 'isError');
  if (isError) {
    toast.error(error.message, {toastId: 'error'}); //*toastId is used to prevent duplicate toasts
    return <Navigate to={`/projects/${projectId}`} />;
  }
  if (data)
    return (
      <>
        <Transition appear show={showModalTasks} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, {replace: true})}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm font-bold text-slate-600">
                      Create Date:{' '}
                      <span className="font-light text-lg text-slate-500 ">
                        {' '}
                        {formatDate(data.createdAt)}
                      </span>
                    </p>
                    <p className="text-sm font-bold  text-slate-600">
                      Last Update:{' '}
                      <span className="font-light text-lg text-slate-500 ">
                        {formatDate(data.updatedAt)}{' '}
                      </span>
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.taskName}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2 font-bold">
                      Description: {data.description}{' '}
                    </p>

                    {data.completedBy.length ? (
                      <>
                        <p className="text-lg text-slate-500 mb-2 font-bold">
                          Log Changes:
                        </p>

                        <ul className="list-decimal">
                          {data.completedBy.map(log => (
                            <li key={log._id}>
                              <span className="font-bold text-slate-600">
                                {' '}
                                Last Updated By :{' '}
                              </span>{' '}
                              {log.user.name} - {log.status}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Status:</label>
                      <select
                        name="selectStatus"
                        id="selectStatus"
                        className="w-full p-3 bg-white border border-gray-300 rounded-sm "
                        defaultValue={data.status}
                        onChange={handleChangeStatus}
                      >
                        {Object.entries(statusList).map(([key, value]) => (
                          <option key={key} value={key}>
                            {' '}
                            {value}{' '}
                          </option>
                        ))}
                      </select>
                    </div>
                    <NotesPanel notes={data.notes} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
