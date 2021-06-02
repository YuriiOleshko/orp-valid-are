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
