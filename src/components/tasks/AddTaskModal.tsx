import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {replace, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {TaskFormData} from '@/interfaces/index';
import TaskForm from './TaskForm';
import {useMutation} from '@tanstack/react-query';
import {createTask} from '@/api/TaskAPI';
import {toast} from 'react-toastify';

export default function AddTaskModal() {
  const navigate = useNavigate();

  const location = useLocation(); //*read data objet from the location object
  const queryParams = new URLSearchParams(location.search); //*search property of the location object
  const modalTask = queryParams.get('newTask');
  //   console.log(modalTask);
  const showModal = modalTask ? true : false;
  //*useForm hook to register the form inputs

  //*get ProjectID by useParams
  const params = useParams();
  const projectId = params.projectId!;
  const initialValues: TaskFormData = {
    taskName: '',
    description: '',
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: initialValues});

  const {mutate, reset} = useMutation({
    mutationFn: createTask,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      reset(); //*reset the form after the task is created
      navigate(location.pathname, {replace: true});
    },
  });

  const handleTaskForm = (taskData: TaskFormData) => {
    const data = {
      taskData,
      projectId,
    };
    mutate(data);
  };
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          //   location.pathname stay in the same path
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
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    New Task
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    {' '}
                    Fill out the following form to create{' '}
                    <span className="text-amber-600">a task</span>
                  </p>
                  <form
                    action=""
                    className="mt-10 space-y-3 "
                    onSubmit={handleSubmit(handleTaskForm)}
                    noValidate
                  >
                    <TaskForm register={register} errors={errors} />
                    <input
                      type="submit"
                      value="Add Task"
                      className=" bg-amber-600 hover:bg-amber-700 w-full p-3 text-white font-bold rounded-lg cursor-pointer transition-colors"
                    />{' '}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
