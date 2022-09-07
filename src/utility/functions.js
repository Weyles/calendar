import {
  DAYS_IN_MONTH,
  MONTH_NUMBERS,
  LEAP_FEBRUARY,
  WEEK_DAYS_FROM_MONDAY,
  DAYS_IN_WEEK,
  SHORT_MONTH_NAMES,
  MONTH_NAMES,
} from "./constants";

const isLeapYear = (year) => {
  return !(year % 100) ? !(year % 400) : !(year % 4);
};

const areEqual = (a, b) => {
  if (!a || !b) return false;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const getDaysInMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = DAYS_IN_MONTH[month];

  if (isLeapYear(year) && month === MONTH_NUMBERS.February) {
    return LEAP_FEBRUARY;
  } else {
    return daysInMonth;
  }
};

const getDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();

  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
};

const getShortMonth = (date) => {
  const shortMonth = date.getMonth();

  return SHORT_MONTH_NAMES[shortMonth];
};

const getMonth = (date) => {
  const month = date.getMonth();

  return MONTH_NAMES[month];
};

const getMonthData = (year, month) => {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
};

const getYearData = (year) => {
  const result = [];
  let monthNumer = 0;

  for (let i = 0; i < 4; i++) {
    result[i] = [];

    for (let j = 0; j < 3; j++) {
      result[i][j] = new Date(year, monthNumer++);
    }
  }

  return result;
};

export {
  areEqual,
  getDayOfWeek,
  getMonthData,
  getShortMonth,
  getMonth,
  getYearData,
};
