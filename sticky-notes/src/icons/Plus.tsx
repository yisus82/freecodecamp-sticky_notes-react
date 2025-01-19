type PlusProps = {
  color?: string;
  size?: number;
};

const Plus: React.FC<PlusProps> = ({ color = '#FFFFFF', size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    stroke={color}
    fill='none'
    strokeWidth='2.5'
  >
    <path strokeLinecap='round' d='M18 12H6M12 6v12'></path>
  </svg>
);

export default Plus;
