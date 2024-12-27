import { useEffect, useRef } from 'react';
import Trash from '../icons/Trash';
import { Note, NoteColor, NotePosition } from '../types/app';

type NoteCardProps = {
  note: Note;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const body = JSON.parse(note.body);
  const colors: NoteColor = JSON.parse(note.colors);
  const position: NotePosition = JSON.parse(note.position);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = (textArea: typeof textAreaRef) => {
    if (!textArea.current) {
      return;
    }
    textArea.current.style.height = 'auto';
    textArea.current.style.height = textArea.current.scrollHeight + 'px';
  };

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  return (
    <div
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className='card-header'
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>
      <div className='card-body'>
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          style={{
            color: colors.colorText,
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
