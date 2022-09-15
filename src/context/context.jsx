import React, { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "../components/loader/loader";
import {
  getMonthData,
  findEventItem,
  areDateEqual,
} from "../utility/functions";
import { databaseGet, databaseSet } from "../utility/control";

const CalendarDataContext = createContext(null); // Create context component

/*
    The function call returns all the data and functions that we pass through the context provider
*/
const useCalendarDataContext = () => {
  const {
    data,
    date,
    setDate,
    eventItems,
    setEventItems,
    addNewEventItem,
    deleteEventItem,
    valueOfDatabaseUsed,
  } = useContext(CalendarDataContext);
  return {
    data,
    date,
    setDate,
    eventItems,
    setEventItems,
    addNewEventItem,
    deleteEventItem,
    valueOfDatabaseUsed,
  };
};

const Context = ({ children }) => {
  const [date, setDate] = useState(new Date()); // Date what shows in calendar
  const [load, setLoad] = useState(false); // If false display loader
  const [eventItems, setEventItems] = useState([]); // Array of event items

  /*
      Depend on selected value we set data to different database
      Values:
      1 - use only local storage
      2 - use only server 
      3 - use both of them
  */
  const valueOfDatabaseUsed = 1;

  useEffect(() => {
    /*
        Load date and eventItems from localStorage and assign data to the state once
     */
    loadAllData();
  }, []);

  /*
      Gett our month data and display it
  */
  const data = getMonthData(date.getFullYear(), date.getMonth());

  /*
      Load date and eventItems from localStorage and assign data to the state
   */
  const loadAllData = async () => {
    await setDateFromDataBase();
    await setEventItemsFromDataBase();
  };

  /*
      Get date from the local storage / database and set it if date was changed once
  */
  const setDateFromDataBase = async () => {
    const stringDateFromDatabase = await databaseGet("date");

    if (!!stringDateFromDatabase) {
      const dateFromDatabase = new Date(stringDateFromDatabase);
      setDate(dateFromDatabase);
      setLoad(false); // After we got a date we show a calendar
    }
  };

  /*
      Get event items from the local storage / database and set it if we create some one
  */
  const setEventItemsFromDataBase = async () => {
    const eventItemsFromDatabase = await databaseGet("eventItems");

    if (!!eventItemsFromDatabase) {
      const formatedData = eventItemsFromDatabase.map((item) => {
        return {
          date: new Date(item.date),
          events: [...item.events],
        };
      });
      setEventItems(formatedData);
    }
  };

  /*
      Create a new event item and push it on our event items array
   */
  const addNewEventItem = async (title, description, date, time) => {
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

    /*
        Look for an array of event items in the local storage
    */
    const eventItemsFromLocalStorage = await databaseGet("eventItems");

    if (!eventItemsFromLocalStorage) {
      /*
          If we didn't find array of event items we create a new one
      */
      setEventItems([eventItem]);
      databaseSet("eventItems", [...eventItems, eventItem]);
    } else {
      /*
          In other case we pushing event item in existing array
          -------
          Create a new array of event items with the correct date format:
      */
      const formatedEventItemsData = eventItemsFromLocalStorage.map((item) => {
        return {
          date: new Date(item.date),
          events: [...item.events],
        };
      });

      /*
          Look for an item with a same date on event items array
      */
      const sameEventItem = findEventItem(
        formatedEventItemsData,
        new Date(date)
      );

      if (!sameEventItem) {
        /*
            If we don't find the same item, push our item to an array
        */
        const modifiedEventItems = [...formatedEventItemsData, eventItem]; // Copy of event items with new event item

        databaseSet("eventItems", modifiedEventItems);
        setEventItems(modifiedEventItems);
      } else if (sameEventItem.events.length < 5) {
        /*
          If we find the same item, push event in it's event array
        */
        addNewEvent(
          formatedEventItemsData,
          sameEventItem,
          title,
          description,
          time
        );
      }
    }
  };

  /*
      Delete event item. Here we use date property as an event item id
  */
  const deleteEventItem = (date) => {
    const formatedEventsItems = eventItems.filter((item) => {
      if (areDateEqual(date, item.date)) {
        return false;
      } else {
        return true;
      }
    });

    databaseSet("eventItems", formatedEventsItems);
    setEventItems(formatedEventsItems);
  };

  /*
      Add new event in event item
  */
  const addNewEvent = (array, item, title, description, time) => {
    /*
        Create a copy of event item and push new event inside
    */
    const modifiedEventItem = item;
    modifiedEventItem.events.push({
      id: new Date().getTime(),
      title: title,
      description: description,
      time: time,
    });

    /*
        Create a copy of event items array and modify our event item
    */
    const modifiedEventItems = array.map((eventItem) => {
      if (areDateEqual(eventItem.date, modifiedEventItem.date)) {
        return modifiedEventItem;
      } else {
        return eventItem;
      }
    });

    databaseSet("eventItems", modifiedEventItems);
    setEventItems(modifiedEventItems);
  };

  if (!load) {
    return (
      <CalendarDataContext.Provider
        value={{
          data,
          date,
          setDate,
          eventItems,
          setEventItems,
          addNewEventItem,
          deleteEventItem,
          valueOfDatabaseUsed,
        }}
      >
        {children}
      </CalendarDataContext.Provider>
    );
  } else {
    return <Loader />;
  }
};

export { Context, useCalendarDataContext };
