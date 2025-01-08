import { useEffect, useRef, useState } from 'react';
import Trash from '../icons/Trash';
import { Note, NoteColor, NotePosition } from '../types/app';

type NoteCardProps = {
  note: Note;
  isActive: boolean;
  setActive: () => void;
};

const NoteCard: React.FC<NoteCardProps> = ({ note, isActive, setActive }) => {
  const body = JSON.parse(note.body);
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

    setPosition({
      x: offsetLeft < 0 ? 0 : offsetLeft,
      y: offsetTop < 0 ? 0 : offsetTop,
    });
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
