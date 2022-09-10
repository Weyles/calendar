import React, { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "../components/loader/loader";
import { localStorageGet, localStorageSet } from "../utility/local-store";
import {
  getMonthData,
  findEventItem,
  areDateEqual,
} from "../utility/functions";

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
  } = useContext(CalendarDataContext);
  return {
    data,
    date,
    setDate,
    eventItems,
    setEventItems,
    addNewEventItem,
    deleteEventItem,
  };
};

const Context = ({ children }) => {
  const [date, setDate] = useState(new Date()); // Date what shows in calendar
  const [load, setLoad] = useState(false); // If false display loader
  const [eventItems, setEventItems] = useState([]); // Array of event items

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
    await setDateFromLocalStore();
    await setEventItemsFromLocalStore();
  };

  /*
      Gett date from the local storage and set it if date was changed once
  */
  const setDateFromLocalStore = async () => {
    const stringDateFromLocalStore = await localStorageGet("date");

    if (!!stringDateFromLocalStore) {
      const dateFromLocalStore = new Date(stringDateFromLocalStore);
      setDate(dateFromLocalStore);
      setLoad(false); // After we got a date we show a calendar
    } else {
      setLoad(false); // After we got a date we show a calendar
    }
  };

  /*
      Gett event items from the local storage and set it if we create some one
  */
  const setEventItemsFromLocalStore = async () => {
    const eventItemsFromLocalStore = await localStorageGet("eventItems");

    if (!!eventItemsFromLocalStore) {
      const formatedData = eventItemsFromLocalStore.map((item) => {
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
    const eventItemsFromLocalStorage = await localStorageGet("eventItems");

    if (!eventItemsFromLocalStorage) {
      /*
          If we didn't find array of event items we create a new one
      */
      console.log([eventItem]);
      setEventItems([eventItem]);
      localStorageSet("eventItems", [...eventItems, eventItem]);
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

        localStorageSet("eventItems", modifiedEventItems);
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

    localStorageSet("eventItems", formatedEventsItems);
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

    localStorageSet("eventItems", modifiedEventItems);
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
