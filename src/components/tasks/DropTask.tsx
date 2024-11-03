import {useDroppable} from '@dnd-kit/core';
interface DropTaskProps {
  status: string;
}
export const DropTask = ({status}: DropTaskProps) => {
  const {isOver, setNodeRef} = useDroppable({id: status});
  //   console.log(isOver);
  const style = isOver ? {borderColor: 'red'} : undefined;
  return (
    <div
      /// <reference path="" />
      ref={setNodeRef}
      style={style}
      className="text-xs font-semibold p-2 border border-dashed border-slate-500 mt-5 text-center grid place-content-center text-slate-600"
    >
      Drop task Here
    </div>
  );
};
