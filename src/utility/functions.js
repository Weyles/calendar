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
    // debugger
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        // console.log("UNDEFINED");
        result[i][j] = undefined;
      } else {
        // const dayWithEvent = findEvent(events, new Date(year, month, day));

        // if (!dayWithEvent) {
        //   // console.log("Empty event");
        result[i][j] = { date: new Date(year, month, day++) };
        // } else {
        //   result[i][j] = dayWithEvent;
        //   day++;
        // }
      }
    }
  }

  // console.log("Ready array:", result);
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

const findEvent = (events, date) => {
  // console.log("DATE", date);
  // console.log("EVENTS", events)
  const event = events.find((event) => {
    return areDateEqual(date, event.date);
  });

  return event;
};

const findItem = (items, date) => {
  // console.log("DATE", date);
  // console.log("ITEMS", items);
  const item = items.find((item) => {
    return areDateEqual(date, item.date);
  });
  // console.log("ITEM!!!!:", item);
  return item;
};

const getStringDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  if (month < 10) {
    month++
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const dateString = `${year}-${month}-${day}`;

  console.log(dateString)
  return dateString;
};

const areDateEqual = (firstDate, secondDate) => {
  // console.log("first", firstDate)
  // console.log("second", secondDate)
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

// const getDataEvents = () => {
//   const dataWithEvents = data.map((week) => {
//     console.log(week);
//     const weekWithEvents = week.map((day) => {
//       const event = events.find((event) => {
//         return (
//           day.date.getFullYear() === event.date.getFullYear() &&
//           day.date.getMonth() === event.date.getMonth() &&
//           day.date.getDate() === event.date.getDate()
//         );
//       });

//       if (!!event) {
//         return {
//           date: event.date,
//           title: event.title,
//           description: event.description,
//           time: event.time,
//         };
//       }
//       // console.log("DAYYY", day);
//       // if (day === undefined) {
//       //   return undefined;
//       // } else if (
//       //   day.date.getFullYear() === new Date(dateValue).getFullYear() &&
//       //   day.date.getMonth() === new Date(dateValue).getMonth() &&
//       //   day.date.getDate() === new Date(dateValue).getDate()
//       // ) {
//       //   return {
//       //     date: new Date(dateValue),
//       //     title: titleValue,
//       //     description: descriptionValue,
//       //     time: timeValue,
//       //   };
//       // } else {
//       //   return {
//       //     date: day.date,
//       //   };
//       // }
//     });

//     return weekWithEvents;
//   });
//   return dataWithEvents;
// };

export {
  areEqual,
  getDayOfWeek,
  getMonthData,
  getShortMonth,
  getMonth,
  getYearData,
  getDaysInMonth,
  findEvent,
  getStringDate,
  areDateEqual,
  findItem,
  // getDataEvents,
};
