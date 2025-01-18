import { useEffect, useRef, useState } from 'react';
import { db } from '../appwrite/databases';
import Spinner from '../icons/Spinner';
import { Note, NoteAttribute, NoteColor, NotePosition } from '../types/app';
import DeleteButton from './DeleteButton';

type NoteCardProps = {
  note: Note;
  isActive: boolean;
  setActive: () => void;
  deleteNoteCard: () => void;
};

const bodyParser = (value: string) => {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const NoteCard: React.FC<NoteCardProps> = ({ note, isActive, setActive, deleteNoteCard }) => {
  const body = bodyParser(note.body);
  const colors: NoteColor = JSON.parse(note.colors);
  const [position, setPosition] = useState<NotePosition>(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef<null | number>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardHeaderRef = useRef<HTMLDivElement>(null);
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

  const calculateNewPosition = (event: MouseEvent) => {
    if (!cardRef.current) {
      return position;
    }

    const mouseMoveDir = {
      x: mouseStartPos.x - event.clientX,
      y: mouseStartPos.y - event.clientY,
    };

    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;

    const offsetLeft = cardRef.current.offsetLeft - mouseMoveDir.x;
    const offsetTop = cardRef.current.offsetTop - mouseMoveDir.y;

    return {
      x: offsetLeft < 0 ? 0 : offsetLeft,
      y: offsetTop < 0 ? 0 : offsetTop,
    };
  };

  const mouseMove = (event: MouseEvent) => {
    const newPosition = calculateNewPosition(event);

    setPosition(newPosition);
  };

  const mouseUp = (event: MouseEvent) => {
    const newPosition = calculateNewPosition(event);
    setPosition(newPosition);
    saveData('position', newPosition);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === cardHeaderRef.current) {
      setActive();
      mouseStartPos.x = event.clientX;
      mouseStartPos.y = event.clientY;
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }
  };

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(async () => {
      if (!textAreaRef.current) {
        return;
      }
      await saveData('body', textAreaRef.current.value);
      setSaving(false);
    }, 2000);
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
        ref={cardHeaderRef}
        onMouseDown={mouseDown}
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <DeleteButton onClick={deleteNoteCard} />
        {saving && (
          <div className='card-saving'>
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving note content, please wait...</span>
          </div>
        )}
      </div>
      <div className='card-body'>
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          onKeyUp={handleKeyUp}
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
