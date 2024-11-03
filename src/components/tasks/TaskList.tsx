import {DndContext, DragEndEvent} from '@dnd-kit/core';
import {Project, TaskProject, TaskStatus} from '@/interfaces/index';
import {TaskCard} from './TaskCard';
import {DropTask} from './DropTask';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateTaskStatus} from '@/api/TaskAPI';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';

interface TaskListProps {
  tasks: TaskProject[];
  canEdit: boolean;
}
type GroupedTasks = {
  [key: string]: TaskProject[];
};
const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

// const statusTranslations = {
//   pending: 'Pendiente',
//   onHold: 'En Espera',
//   inProgress: 'En Progreso',
//   underReview: 'En Revisión',
//   completed: 'Completado',
// };
const statusColors: {[key: string]: string} = {
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-green-500',
};

export const TaskList = ({tasks, canEdit}: TaskListProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  // const queryParams = new URLSearchParams(location.search);

  // const taskId = queryParams.get('viewTask')!;
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return {...acc, [task.status]: currentGroup};
  }, initialStatusGroups);
  // console.log(groupedTasks);
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
      // queryClient.invalidateQueries({
      //   queryKey: ['taskDetails', taskId],
      // });
      toast.success(data);
      // navigate(location.pathname, {replace: true});
    },
  });

  const handledragEnd = (e: DragEndEvent) => {
    const {over, active} = e;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({projectId, taskId, status});
      queryClient.setQueryData(
        ['editProject', projectId],
        (oldData: Project) => {
          console.log(oldData);
          const updateTask = oldData.tasks.map(task => {
            if (task._id === taskId) {
              return {...task, status};
            }
            return task;
          });
          return {
            ...oldData,
            task: updateTask,
          };
        }
      );
    }
  };
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handledragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={` capitalize text-xl font-light border
                 border-slate-300 p-3 rounded-md bg-white border-t-8 ${statusColors[status]}`}
              >
                {status}
              </h3>

              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No task in this project
                  </li>
                ) : (
                  tasks.map(task => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
};
