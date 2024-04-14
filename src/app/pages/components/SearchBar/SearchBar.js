import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import { Input } from '@mui/material';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <Input
      className="w-[640px] border-1 px-12 rounded-8"
      placeholder="Search TX, blocks, IDs..."
      value={keyword}
      disableUnderline
      autoFocus
      startAdornment={<FuseSvgIcon className="mr-20">heroicons-outline:search</FuseSvgIcon>}
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
    />
  );
};

export default SearchBar;
