import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useCalendarDataContext } from "../../../context/context";
import { Event } from "./../event/event";
import { NAMES_OF_DAYS } from "../../../utility/constants";
import { databaseSet, databaseDelete } from "../../../utility/control";
import {
  getDayOfWeek,
  areDateEqual,
  findEventItem,
} from "../../../utility/functions";

const Item = (props) => {
  const { data } = props;
  const { eventItems, setEventItems, addNewEventItem, deleteEventItem } =
    useCalendarDataContext(); // Get data from Context component

  /*
      Look for some events in this item  
  */
  const eventItem = findEventItem(eventItems, data.date);

  /*
      Delete event or event item
  */
  const deleteEvent = (id) => {
    /*
        Create a copy of event items array and delete items inside
    */
    const eventItemsWithModifiedData = eventItems
      .map((eventItem) => {
        /*
            Check if there are empty events
        */
        if (eventItem.events.length !== 0) {
          /*
              Look for a event item with same date of our item date
          */
          if (areDateEqual(eventItem.date, data.date)) {
            /*
                Delete item by id
            */
            const formettedEvents = eventItem.events.filter((event) => {
              return event.id !== id;
            });
            /*
                  If there are some empty events in item return a null.
                  After this we will look for a null value for a distant delete in filter method
            */
            if (formettedEvents.length !== 0) {
              /*
                  In other case we return event item with modified data
              */
              const modifiedEventItem = eventItem; // Create copy of our event item
              modifiedEventItem.events = formettedEvents; // Set value of modified events array

              return modifiedEventItem; // Return modified event item
            }
          } else {
            return eventItem;
          }
        }
      })
      .filter((eventItem) => eventItem !== undefined); // Delete undefined item from event items array

    /*
        Check if we have items in event items array
    */
    if (eventItemsWithModifiedData.length === 0) {
      /*
          If we don't have any event item, set empty array to our event items state
          and delete all event items from local storage
      */
      databaseDelete("eventItems");
      setEventItems([]);
    } else {
      setEventItems(eventItemsWithModifiedData);
      databaseSet("eventItems", eventItemsWithModifiedData);
    }
  };

  /*
      Change event data inside event item
  */
  const changeEvent = (id, date, title, description, time) => {
    /*
        Check if date of this item is equal with changed event item date
    */
    if (areDateEqual(data.date, date)) {
      /*
           Create a copy of event items array and change event item inside
      */
      const eventItemsWithModifiedData = eventItems.map((eventItem) => {
        /*
            Check if date of event item is equal with changed event item date
        */
        if (areDateEqual(eventItem.date, date)) {
          /*
              Create a copy of event item and change event inside item 
          */
          const formettedEvents = eventItem.events.map((event) => {
            if (event.id === id) {
              const newEvent = {
                id: id,
                title: title,
                description: description,
                date: date,
                time: time,
              };

              return newEvent; // Return changed event
            } else {
              return event;
            }
          });

          const newEventItem = eventItem; // Create copy of event item
          newEventItem.events = formettedEvents; // In the copy we change old events to the new one

          return newEventItem; // Return modified event item
        } else {
          return eventItem;
        }
      });

      setEventItems(eventItemsWithModifiedData);
      databaseSet("eventItems", eventItemsWithModifiedData);
    } else {
      /*
          Check if there are any events
          If there are no events left in this item, delete this item from event items array
          And create a new one
      */
      if (eventItem.events.length === 1) {
        deleteEventItem(data.date);
        addNewEventItem(title, description, date, time);
      } else {
        /*
            If there are some events left, delete choose event by id
        */
        deleteEvent(id);
        addNewEventItem(title, description, date, time);
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-between">
          <small>{data.date.getDate()}</small>
          <small>{NAMES_OF_DAYS[getDayOfWeek(data.date)]}</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {!eventItem
              ? ""
              : eventItem.events.map((event) => (
                  <Event
                    key={event.id}
                    date={data.date}
                    event={event}
                    deleteEvent={deleteEvent}
                    changeEvent={changeEvent}
                  />
                ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export { Item };
