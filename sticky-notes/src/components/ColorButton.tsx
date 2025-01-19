import { NoteColor } from '../types/app';

type ColorButtonProps = {
  color: NoteColor;
  onClick: () => void;
};

const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => (
  <div className='color-btn' onClick={onClick} style={{ backgroundColor: color.colorHeader }}></div>
);

export default ColorButton;
