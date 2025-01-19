import AddButton from './AddButton';

type ControlPanelProps = {
  addNoteCard: () => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({ addNoteCard }) => (
  <div id='controls'>
    <AddButton onClick={addNoteCard} />
  </div>
);

export default ControlPanel;
