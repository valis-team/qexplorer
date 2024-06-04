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

function formatEllipsis(str, letter = 4) {
  if (str) {
    if (str.length > 10) {
      return `${str.substr(0, letter)} ... ${str.substr(-letter)}`;
    }
    return str;
  }
  return '';
}

function copyText(textToCopy) {
  const input = document.createElement('input');
  input.value = textToCopy;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

function getStandardTime(utcTimestamp) {
  // Create a Date object with the UTC timestamp
  const utcDate = new Date(utcTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  return utcDate;
}

function getTimeAgo(currentTime, timestamp) {
  const timeDifference = currentTime - timestamp;
  const totalSeconds = Math.floor(timeDifference / 1000);
  if (totalSeconds <= 0) {
    return `0 seconds ago`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  let minLabel = 'mins';
  let secondLabel = 'seconds';
  if (minutes <= 1) {
    minLabel = 'min';
  }
  if (secondLabel <= 1) {
    secondLabel = 'second';
  }

  return `${minutes} ${minLabel} ${seconds} ${secondLabel} ago`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitAtFirstSpace(str) {
  const index = str.indexOf(' ');
  if (index === -1) {
    return [str];
  }
  return [str.slice(0, index), JSON.parse(str.slice(index + 1))];
}

export {
  formatString,
  formatDate,
  formatEllipsis,
  copyText,
  delay,
  getStandardTime,
  capitalizeFirstLetter,
  splitAtFirstSpace,
  getTimeAgo,
};
