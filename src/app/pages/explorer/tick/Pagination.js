import { PaginationItem, Pagination as PaginationMui } from '@mui/material';

const Pagination = ({ count, handleChangePageNum }) => {
  const handleChange = (_, value) => {
    handleChangePageNum(value);
  };

  return (
    <PaginationMui
      count={count}
      shape="rounded"
      color="primary"
      className="w-fit mx-auto mt-7"
      onChange={handleChange}
      renderItem={(item) => <PaginationItem style={{ color: '#fff' }} {...item} />}
    />
  );
};

export default Pagination;
