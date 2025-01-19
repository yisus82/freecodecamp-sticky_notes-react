import colors from '../constants/colors';
import { NoteColor } from '../types/app';
import AddButton from './AddButton';
import ColorButton from './ColorButton';

type ControlPanelProps = {
  addNoteCard: () => void;
  changeNoteCardColor: (color: NoteColor) => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({ addNoteCard, changeNoteCardColor }) => (
  <div id='controls'>
    <AddButton onClick={addNoteCard} />
    {colors.map(color => (
      <ColorButton key={color.id} color={color} onClick={() => changeNoteCardColor(color)} />
    ))}
  </div>
);

export default ControlPanel;
