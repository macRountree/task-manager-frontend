import {useForm} from 'react-hook-form';
import {ErrorMessage} from '../ErrorMessage';
import {NoteFormData} from '@/interfaces/index';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {createNote} from '@/api/NotesApi';
import {useLocation, useParams} from 'react-router-dom';

export const AddNoteForm = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;

  const taskId = queryParams.get('viewTask')!;
  const initialValues: NoteFormData = {content: ''}; //*create interface for content

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: initialValues,
  });

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: createNote, //* need params to project id , taskId for handleAddNote
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ['taskDetails', taskId],
      });
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData});
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div>
        <label htmlFor="content" className="font-bold ">
          {' '}
          CreateNote
        </label>
        <input
          type="text"
          id="content"
          placeholder="Note content"
          className="w-full p-3 bg-slate-200 border border-gray-300 rounded-lg "
          {...register('content', {
            required: 'Note content is required',
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Create Note"
        className="bg-amber-600 hover:bg-amber-700 transition-colors w-full p-2  rounded-lg text-white font-bold cursor-pointer"
      />
    </form>
  );
};
