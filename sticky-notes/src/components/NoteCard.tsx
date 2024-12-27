import Trash from '../icons/Trash';
import { Note, NoteColor, NotePosition } from '../types/app';

type NoteCardProps = {
  note: Note;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const body = JSON.parse(note.body);
  const colors: NoteColor = JSON.parse(note.colors);
  const position: NotePosition = JSON.parse(note.position);

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
          defaultValue={body}
          style={{
            color: colors.colorText,
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
