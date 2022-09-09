import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { getMonthData, findEvent, areDateEqual } from "../utility/functions";

const CalendarDataContext = createContext(null);

const useCalendarDataContext = () => {
  const {
    data,
    date,
    setDate,
    year,
    month,
    day,
    eventItems,
    setEventItems,
    addNewEventItem,
  } = useContext(CalendarDataContext);
  return {
    data,
    date,
    setDate,
    year,
    month,
    day,
    eventItems,
    setEventItems,
    addNewEventItem,
  };
};

const Context = ({ children }) => {
  const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(null);
  const [eventItems, setEventItems] = useState([
    {
      date: new Date(date),
      events: [
        {
          id: new Date().getTime(),
          title: "Task #1",
          description: "Read README.md file",
          time: "18:43",
        },
        {
          id: new Date().getTime() + 1,
          title: "Task #2",
          description: "Сall the author for an interview :)",
          time: "18:59",
        },
      ],
    },
  ]);

  const year = () => {
    return date.getFullYear();
  };

  const month = () => {
    return date.getMonth();
  };

  const day = () => {
    return date.getDate();
  };

  const data = getMonthData(date.getFullYear(), date.getMonth());

  const addNewEventItem = (title, description, date, time) => {
    const eventItem = {
      date: new Date(date),
      events: [
        {
          id: new Date().getTime(),
          title: title,
          description: description,
          time: time,
        },
      ],
    };

    //Ищем похожий item
    const sameEventItem = findEvent(eventItems, new Date(date));

    // console.log("SAMEEV", sameEventItem);

    //В зависимости от того, нашли ли мы item создаем новый или меняем существующий
    if (!sameEventItem) {
      setEventItems([...eventItems, eventItem]);
    } else if (sameEventItem.events.length < 5) {
      addNewEvent(eventItems, sameEventItem, title, description, time);
    }
  };

  const addNewEvent = (array, item, title, description, time) => {
    item.events.push({
      id: new Date().getTime(),
      title: title,
      description: description,
      time: time,
    });

    const copyOfEventItems = array.map((eventItem) => {
      if (areDateEqual(eventItem.date, item.date)) {
        return item;
      } else {
        return eventItem;
      }
    });
    console.log("COPY!!!!", copyOfEventItems);
    setEventItems(copyOfEventItems);
  };

  return (
    <CalendarDataContext.Provider
      value={{
        data,
        date,
        setDate,
        year,
        month,
        day,
        eventItems,
        setEventItems,
        addNewEventItem,
        addNewEvent,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
};

export { Context, useCalendarDataContext };
