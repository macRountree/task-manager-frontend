import {FieldErrors, UseFormRegister} from 'react-hook-form';
import {TaskFormData} from '@/interfaces/index';
import {ErrorMessage} from '../ErrorMessage';

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({errors, register}: TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">
          task Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="  task Name "
          className="w-full p-3  border-gray-300 border"
          {...register('taskName', {
            required: 'task Name is required',
          })}
        />
        {errors.taskName && (
          <ErrorMessage>{errors.taskName.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="description">
          task Description
        </label>
        <textarea
          id="description"
          placeholder="task Description"
          className="w-full p-3  border-gray-300 border"
          {...register('description', {
            required: ' task Description is required',
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
