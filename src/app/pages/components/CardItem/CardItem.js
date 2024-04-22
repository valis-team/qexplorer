import clsx from 'clsx';

function CardItem(props) {
  const { children, className, size = 'default' } = props;

  return <div className={clsx('border-1 border-gray-60', className)}>{children}</div>;
}

export default CardItem;
