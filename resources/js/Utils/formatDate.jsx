import React from 'react';

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}年${formattedMonth}月${formattedDay}日`;
};

const MyComponent = ({ createdAt }) => {
  return (
    <div>
      作成日: {formatDate(createdAt)}
    </div>
  );
};

export default formatDate;