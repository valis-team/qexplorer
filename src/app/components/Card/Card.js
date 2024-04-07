import clsx from 'clsx';

function Card(props) {
  const { children, className } = props;

  return (
    <div className={clsx('bg-gray-80 border-1 border-gray-60 rounded-8', className)}>
      {children}
    </div>
  );
}

export default Card;
