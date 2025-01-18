import { useEffect, useRef, useState } from 'react';
import { db } from '../appwrite/databases';
import Trash from '../icons/Trash';
import { Note, NoteAttribute, NoteColor, NotePosition } from '../types/app';

type NoteCardProps = {
  note: Note;
  isActive: boolean;
  setActive: () => void;
};

const bodyParser = (value: string) => {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const NoteCard: React.FC<NoteCardProps> = ({ note, isActive, setActive }) => {
  const body = bodyParser(note.body);
  const colors: NoteColor = JSON.parse(note.colors);
  const [position, setPosition] = useState<NotePosition>(JSON.parse(note.position));
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseStartPos = {
    x: 0,
    y: 0,
  };

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

  const saveData = async (key: NoteAttribute, value: NotePosition | string) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const mouseMove = (event: MouseEvent) => {
    if (!cardRef.current) {
      return;
    }

    const mouseMoveDir = {
      x: mouseStartPos.x - event.clientX,
      y: mouseStartPos.y - event.clientY,
    };

    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;

    const offsetLeft = cardRef.current.offsetLeft - mouseMoveDir.x;
    const offsetTop = cardRef.current.offsetTop - mouseMoveDir.y;

    const newPosition = {
      x: offsetLeft < 0 ? 0 : offsetLeft,
      y: offsetTop < 0 ? 0 : offsetTop,
    };
    setPosition(newPosition);
    saveData('position', newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActive();
    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  return (
    <div
      className='card'
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 1 : 0,
      }}
    >
      <div
        className='card-header'
        onMouseDown={mouseDown}
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
          onFocus={() => setActive()}
          style={{
            color: colors.colorText,
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
