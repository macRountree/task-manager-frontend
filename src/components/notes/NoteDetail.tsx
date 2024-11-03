import {deleteNote} from '@/api/NotesApi';
import {formatDate} from '@/helpers/helpers';
import {useAuth} from '@/hooks/useAuth';
import {Note} from '@/interfaces/index';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

interface NoteDetailProps {
  note: Note;
}

export const NoteDetail = ({note}: NoteDetailProps) => {
  const {data, isLoading} = useAuth();
  const canDelete = useMemo(
    () => data?._id === note.createdBy._id,
    [data, note]
  );
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!;

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: deleteNote,
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
  const handleDelete = () => {
    mutate({projectId, taskId, noteId: note._id});
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} by:{' '}
          <span className="font-bold "> {note.createdBy.name} </span>{' '}
        </p>
        <p className="text-xs text-slate-400">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          className="bg-red-500 hover:bg-red-700 transition-colors px-3 py-2 rounded-md text-white text-sm "
          onClick={handleDelete}
        >
          Remove
        </button>
      )}
    </div>
  );
};
