import { MouseEventHandler } from 'react';
import Trash from '../icons/Trash';

type DeleteButtonProps = {
  onClick: MouseEventHandler<HTMLDivElement>;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <div onClick={onClick}>
    <Trash />
  </div>
);

export default DeleteButton;
