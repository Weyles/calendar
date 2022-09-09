import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Item } from "./item/item";
import { NAMES_OF_DAYS } from "../../utility/constants";
import "./calendar.css";
import { areEqual, getDayOfWeek, getMonthData } from "../../utility/functions";
import { useCalendarDataContext } from "../../context/context";

const Calendar = () => {
  const [currentDate] = useState(new Date());

  const { data } = useCalendarDataContext();

  const handleDayClick = (event, date) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          {data.map((week, index) => (
            <tr key={index}>
              {week.map((dateInWeek, index) =>
                dateInWeek ? (
                  <td
                    onClick={(event) => handleDayClick(event, dateInWeek.date)}
                    className={
                      areEqual(currentDate, dateInWeek.date)
                        ? "current-date-item"
                        : "item"
                    }
                    key={index}
                  >
                    <Item data={dateInWeek} />
                  </td>
                ) : (
                  <td className="" key={index}></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export { Calendar };
