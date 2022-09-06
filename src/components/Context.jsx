import React, { createContext, useContext } from "react";
import { useState } from "react";

const CalendarDataContext = createContext(null);

const useCalendarDataContext = () => {
//   const {
//   } = useContext(CalendarDataContext);
//   return {null};
};

function Context({ children }) {


  return (
    <CalendarDataContext.Provider
      value={null}
    >
      {children}
    </CalendarDataContext.Provider>
  );
}

export { Context };
