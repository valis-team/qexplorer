// import { useSocket } from "../context/SocketContext";

const formatString = (string) => {
  return string ? Number(string).toLocaleString('en-US') : '0';
};

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hour12: true, // Use 12-hour format with AM/PM
  };

  if (dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  return '';
};

function formatEllipsis(str) {
  if (str) {
    if (str.length > 10) {
      return `${str.substr(0, 4)}...${str.substr(-4)}`;
    }
    return str;
  }
  return '';
}

// const getAddress = (add) => {
//   const { marketcap, emptyticks, recenttx, loading, sendMessage } = useSocket();
// }

export { formatString, formatDate, formatEllipsis };
