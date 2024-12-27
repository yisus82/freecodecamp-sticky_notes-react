import { Note } from '../types/app';

type NoteCardProps = {
  note: Note;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);

  return (
    <div
      className='card'
      style={{
        backgroundColor: colors.colorBody,
      }}
    >
      <div
        className='card-header'
        style={{
          backgroundColor: colors.colorHeader,
        }}
      ></div>
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
