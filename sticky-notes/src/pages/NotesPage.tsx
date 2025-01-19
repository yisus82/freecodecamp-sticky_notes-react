import { useEffect, useState } from 'react';
import { db } from '../appwrite/databases';
import NoteCard from '../components/NoteCard';
import Spinner from '../icons/Spinner';
import { DBNote } from '../types/app';

const NotesPage = () => {
  const [activeNoteCardId, setActiveNoteCardId] = useState('');
  const [notes, setNotes] = useState<DBNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    setIsLoading(true);
    const response = await db.notes.list();
    const dbNotes = response.documents as DBNote[];
    setNotes(dbNotes);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const deleteNoteCard = async (id: string) => {
    await db.notes.delete(id);
    setNotes(prevState => prevState.filter(note => note.$id !== id));
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <Spinner size={32} />
        <span>Loading notes...</span>
      </div>
    );
  }

  return (
    <div>
      {notes.map(note => (
        <NoteCard
          note={note}
          key={note.$id}
          isActive={note.$id === activeNoteCardId}
          setActive={() => setActiveNoteCardId(note.$id)}
          deleteNoteCard={() => deleteNoteCard(note.$id)}
        />
      ))}
    </div>
  );
};

export default NotesPage;
