import React, { createContext, useContext } from 'react'

const CalendarDataContext = createContext(null)

const useCalendarDataContext = () => {
    const {} = useContext(CalendarDataContext);
    return {};
}

function Context({children}) {


  return (
    <CalendarDataContext.Provider value={null}>
        {children}
    </CalendarDataContext.Provider>
  )
}

export {useCalendarDataContext, Context}