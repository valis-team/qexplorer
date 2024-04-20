import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import { Input } from '@mui/material';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <Input
      className="w-full border-1 px-12 text-main-30 text-urb text-14 bg-main-100"
      placeholder="Search TX, blocks, IDs..."
      value={keyword}
      disableUnderline
      autoFocus
      startAdornment={
        <FuseSvgIcon className="mr-20 w-14 h-12 text-main-30">heroicons-outline:search</FuseSvgIcon>
      }
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
      style={{
        boxShadow: '0 5px 10px rgba(255, 255, 255, 0.1), 0 6px 6px rgba(255, 255, 255, 0.1)',
      }}
    />
  );
};

export default SearchBar;
