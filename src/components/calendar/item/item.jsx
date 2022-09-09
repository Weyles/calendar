import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useCalendarDataContext } from "../../../context/context";
import { Event } from "./../event/event";
import { NAMES_OF_DAYS } from "../../../utility/constants";
import {
  getDayOfWeek,
  areDateEqual,
  findItem,
} from "../../../utility/functions";

const Item = (props) => {
  const { data } = props;
  const { eventItems, setEventItems, addNewEventItem } =
    useCalendarDataContext();

  const eventItem = findItem(eventItems, data.date);

  const deleteEvent = (id) => {
    // console.log("ID", id);
    const eventItemsWithModifiedData = eventItems.map((eventItem) => {
      // console.log("ITEM", eventItem);

      // console.log("EVENT_ITEM", eventItem.date);
      // console.log("DATA", data.date);

      if (areDateEqual(eventItem.date, data.date)) {
        // console.log("DATES_ARE_EQUAL");
        const formettedEvents = eventItem.events.filter((event) => {
          // console.log("EVENT_ID", event.id);

          return event.id !== id;
        });

        eventItem.events = formettedEvents;

        // console.log("EVENT_ITEM_W_D_E", eventItem);
        return eventItem;
      } else {
        return eventItem;
      }
    });

    // console.log("EVENT_ITEMS_CHANGED", eventItemsWithModifiedData);
    setEventItems(eventItemsWithModifiedData);
  };

  const changeEvent = (id, date, title, description, time) => {
    console.log("WORKKK")
    console.log("DATE_DATE", data.date);
    console.log("DATE", date);

    if (areDateEqual(data.date, date)) {
      console.log("FFFFF");
      // console.log("ID", id);
      const eventItemsWithModifiedData = eventItems.map((eventItem) => {
        // console.log("ITEM", eventItem);

        console.log("EVENT_ITEM", eventItem.date);
        console.log("DATA", new Date(date));

        if (areDateEqual(eventItem.date, new Date(date))) {
          // console.log("DATES_ARE_EQUAL");
          const formettedEvents = eventItem.events.map((event) => {
            // console.log("EVENT_ID", event.id);
            if (event.id === id) {
              const newEvent = {
                id: id,
                title: title,
                description: description,
                date: date,
                time: time,
              };

              return newEvent;
            } else {
              return event;
            }
          });

          console.log("FORMATTED", formettedEvents);
          eventItem.events = formettedEvents;

          // console.log("EVENT_ITEM_W_D_E", eventItem);
          return eventItem;
        } else {
          return eventItem;
        }
      });

      console.log("EVENT_ITEMS_CHANGED", eventItemsWithModifiedData);
      setEventItems(eventItemsWithModifiedData);
    } else {
      addNewEventItem(title, description, date, time);
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
