import {
  DAYS_IN_MONTH,
  MONTH_NUMBERS,
  LEAP_FEBRUARY,
  WEEK_DAYS_FROM_MONDAY,
  DAYS_IN_WEEK,
  SHORT_MONTH_NAMES,
  MONTH_NAMES,
} from "./constants";

/*
  Check if a year is a leap year
*/
const isLeapYear = (year) => {
  return !(year % 100) ? !(year % 400) : !(year % 4); //boolean
};

/*
    Date Similarity Check
*/
const areEqual = (firstDate, secondDate) => {
  if (!firstDate || !secondDate) return false;

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

/*
    Return days in a month
*/
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

/*
    Return the day the month starts at
*/
const getDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();

  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
};

/*
    Return short month name
*/
const getShortMonth = (date) => {
  const shortMonth = date.getMonth();

  return SHORT_MONTH_NAMES[shortMonth];
};

/*
    Return month name
*/
const getMonth = (date) => {
  const month = date.getMonth();

  return MONTH_NAMES[month];
};

/*
  Create an array with the data of the month in year we choose
*/
const getMonthData = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  // Check how many rows are there
  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    // Push date in avery day of week
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = { date: new Date(year, month, day++) };
      }
    }
  }

  return result; // Return array with date objects in every day in month
};

/*
    Get list of the month in the year
*/
const getYearData = (year) => {
  const result = [];
  let monthNumer = 0;

  for (let i = 0; i < 4; i++) {
    result[i] = [];

    for (let j = 0; j < 3; j++) {
      result[i][j] = new Date(year, monthNumer++);
    }
  }

  return result; // Return list of the month in the year
};

/*
    Find an eventItem by date inside an array of eventItems
*/
const findEventItem = (items, date) => {
  const item = items.find((item) => {
    return areDateEqual(date, item.date);
  });

  return item;
};

/*
    Formatt date type to string for date form
*/
const getStringDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  if (month < 10) {
    month++;
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const dateString = `${year}-${month}-${day}`;

  return dateString;
};

/*
    Check if two dates are equal
*/
const areDateEqual = (firstDate, secondDate) => {
  if (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

export {
  areEqual,
  getDayOfWeek,
  getMonthData,
  getShortMonth,
  getMonth,
  getYearData,
  getDaysInMonth,
  // findEvent,
  getStringDate,
  areDateEqual,
  findEventItem,
};
