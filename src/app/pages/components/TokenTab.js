import { Autocomplete, IconButton, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from 'src/app/context/SocketContext';

export default function TokenTab(props) {
  const { tokens: soketTokens, sendMessage } = useSocket();
  const { token } = useParams();
  const tokens = props.tokens || ['QU', ...(soketTokens || [])] || [];
  const navigate = useNavigate();
  const displayCount = 5;
  const [displayTokens, setDisplayTokens] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    sendMessage('tokenlist');
  }, [sendMessage]);

  useEffect(() => {
    const tokenIndex = tokens.indexOf(token);
    if (tokenIndex > -1 && displayTokens[0] !== token) {
      handleChangToken({ label: token, value: tokenIndex });
    }

    if (displayTokens.length < 2) {
      setDisplayTokens((tokens || []).slice(0, displayCount));
    }
  }, [tokens, token]);
  const handleChangToken = (val) => {
    const total = tokens.length;
    if (val.value + displayCount <= total) {
      setDisplayTokens(tokens.slice(val.value, displayCount + val.value));
    } else {
      setDisplayTokens([
        ...tokens.slice(val.value, total),
        ...tokens.slice(0, val.value + displayCount - total),
      ]);
    }
    navigate(`./${val.label}`);
    setSearch(false);
  };

  return (
    <div className="mt-4 flex gap-8 md:gap-20 items-center justify-between md:justify-start">
      {search ? (
        <Autocomplete
          disablePortal
          defaultValue={{
            value: tokens.indexOf(token),
            label: token,
          }}
          options={tokens.map((item, key) => ({
            value: key,
            label: item,
          }))}
          sx={{
            width: 400,
            height: 50,
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d2e0fc4d',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D2E0FC',
            },
          }}
          onChange={(e, val) => handleChangToken(val)}
          renderInput={(params) => <TextField {...params} label="SC" />}
        />
      ) : (
        <div className="flex">
          {tokens.map((item, key) => (
            <Typography
              key={key}
              className={`px-6 md:px-12 py-12 hover:text-white ${
                token === item
                  ? 'border-b-2 border-hawkes-100 text-bold text-white'
                  : 'text-main-50  border-b-1'
              }`}
              style={{ borderColor: token === item ? '#D2E0FC' : '#d2e0fc4d' }}
              role="button"
              component={Link}
              to={`./${item}`}
            >
              {item}
            </Typography>
          ))}
          {/* <Typography
            className="px-16 md:px-32 py-12 text-hawkes-50  border-b-1"
            style={{ borderColor: '#d2e0fc4d' }}
          >
            ...
          </Typography> */}
        </div>
      )}

      <IconButton onClick={() => setSearch(!search)}>
        {search ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </div>
  );
}
