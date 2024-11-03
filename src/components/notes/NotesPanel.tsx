import {Task} from '@/interfaces/index';
import {AddNoteForm} from './AddNoteForm';
import {NoteDetail} from './NoteDetail';
interface NotesPanelProps {
  notes: Task['notes'];
}
export const NotesPanel = ({notes}: NotesPanelProps) => {
  return (
    <>
      <AddNoteForm />
      <div className="divide-y mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600">
              Notes:
              {notes.map(note => (
                <NoteDetail key={note._id} note={note} />
              ))}
            </p>
          </>
        ) : (
          <p className="text-red-500">No Notes</p>
        )}
      </div>
    </>
  );
};
