import Plus from '../icons/Plus';

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <div id='add-btn' onClick={onClick}>
    <Plus />
  </div>
);

export default AddButton;
