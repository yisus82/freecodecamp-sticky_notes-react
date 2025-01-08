import { useState } from 'react';
import { fakeData as notes } from '../assets/fakeData.js';
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
  const [activeNoteCardId, setActiveNoteCardId] = useState<number | null>(null);

  return (
    <div>
      {notes.map(note => (
        <NoteCard
          note={note}
          key={note.$id}
          isActive={note.$id === activeNoteCardId}
          setActive={() => setActiveNoteCardId(note.$id)}
        />
      ))}
    </div>
  );
};

export default NotesPage;
