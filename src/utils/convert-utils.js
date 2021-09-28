const addZeroAheadToDate = (num) => `${`0${num.toString()}`.slice(-2)}`;

// Format (00.00.00)
export const formattedDate = (timestamp, divider) => {
  const time = new Date(timestamp);
  return `${addZeroAheadToDate(
    time.getMonth() + 1,
  )}${divider}${addZeroAheadToDate(time.getDate())}${divider}${time
    .getFullYear()
    .toString()
    .slice(-2)}`;
};

// Date in 24 hours format (10:50:32)
export const convertDateToHours = (timestamp, divider) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${addZeroAheadToDate(hours)}${divider}${addZeroAheadToDate(minutes)}`;
};

// Timer (10d 15h 32m)
/* eslint-disable */
export const getTimer = (timestamp) => {
  const days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

// Timer (10:15:32 hrs)
/* eslint-disable */
export const getTimerInHours = (timestamp) => {
  const days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const totalHours = days * 24 + hours;

  const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));

  return `${totalHours}h ${minutes}m`;
};

export const nanoToMicro = (timestamp) => {
  return Math.floor(timestamp / 1e6)
}
