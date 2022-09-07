import React, { createContext, useContext } from "react";
import { useState } from "react";

const CalendarDataContext = createContext(null);

const useCalendarDataContext = () => {
  const {
    date,
    setDate,
    year,
    month,
    day,
    setSelectedDate,
    selectedDate,
    events,
    setEvents,
  } = useContext(CalendarDataContext);
  return {
    date,
    setDate,
    year,
    month,
    day,
    setSelectedDate,
    selectedDate,
    events,
    setEvents,
  };
};

const Context = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const year = () => {
    return date.getFullYear();
  };

  const month = () => {
    return date.getMonth();
  };

  const day = () => {
    return date.getDate();
  };

  return (
    <CalendarDataContext.Provider
      value={{
        date,
        setDate,
        year,
        month,
        day,
        setSelectedDate,
        selectedDate,
        events,
        setEvents,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
};

export { Context, useCalendarDataContext };
