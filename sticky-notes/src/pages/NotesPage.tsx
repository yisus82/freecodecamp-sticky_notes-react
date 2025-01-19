import { useEffect, useState } from 'react';
import { db } from '../appwrite/databases';
import ControlPanel from '../components/ControlPanel';
import NoteCard from '../components/NoteCard';
import { defaultColor } from '../constants/colors';
import Spinner from '../icons/Spinner';
import { DBNote, NotePosition } from '../types/app';

const NotesPage = () => {
  const [activeNoteCardId, setActiveNoteCardId] = useState('');
  const [notes, setNotes] = useState<DBNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newNoteCardPosition, setNewNoteCardPosition] = useState<NotePosition>({ x: 0, y: 0 });

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

  const addNoteCard = async () => {
    const payload = {
      body: '',
      colors: JSON.stringify(defaultColor),
      position: JSON.stringify(newNoteCardPosition),
    };
    const response = await db.notes.create(payload);
    const newNote = response as DBNote;
    setNotes(prevState => [...prevState, newNote]);
    setActiveNoteCardId(newNote.$id);
    setNewNoteCardPosition({ x: newNoteCardPosition.x + 20, y: newNoteCardPosition.y + 20 });
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
      <ControlPanel addNoteCard={addNoteCard} />
    </div>
  );
};

export default NotesPage;
