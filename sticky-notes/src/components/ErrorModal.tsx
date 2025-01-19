type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => (
  <div className='modal'>
    <div className='modal-content'>
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default ErrorModal;
