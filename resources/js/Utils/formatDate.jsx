export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}年${formattedMonth}月${formattedDay}日`;
};
