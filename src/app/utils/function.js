// import { useSocket } from "../context/SocketContext";

const formatString = (string) => {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(string)
    .replace(/,/g, "'");
  return formattedNumber;
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

  const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
  const days = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  let agoString = '';

  if (years > 0) {
    agoString += years === 1 ? `${years} year ` : `${years} years `;
  }
  if (days > 0) {
    agoString += days === 1 ? `${days} day ` : `${days} days `;
  }
  if (hours > 0) {
    agoString += hours === 1 ? `${hours} hour ` : `${hours} hours `;
  }
  if (minutes > 0) {
    agoString += minutes === 1 ? `${minutes} min ` : `${minutes} mins `;
  }
  if (seconds > 0) {
    agoString += seconds === 1 ? `${seconds} second ` : `${seconds} seconds `;
  }

  return `${agoString.trim()} ago`;
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
