import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Item } from "./item";
import { NAMES_OF_DAYS } from "../utility/constants";
import "./calendar.css";
import { areEqual, getDayOfWeek, getMonthData } from "../utility/functions";
import { useCalendarDataContext } from "./context";

const Calendar = () => {
  const [currentDate] = useState(new Date());

  const { date, setSelectedDate } = useCalendarDataContext();

  const monthDate = getMonthData(date.getFullYear(), date.getMonth());

  const handleDayClick = (event, date) => {
    event.preventDefault();
    setSelectedDate(date);
  };

  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          {monthDate.map((week, index) => (
            <tr key={index}>
              {week.map((dateInWeek, index) =>
                dateInWeek ? (
                  <td
                    onClick={(event) => handleDayClick(event, dateInWeek)}
                    className={
                      areEqual(currentDate, dateInWeek)
                        ? "current-date-item"
                        : "item"
                    }
                    key={index}
                  >
                    <Item
                      data={dateInWeek.getDate()}
                      day={NAMES_OF_DAYS[getDayOfWeek(dateInWeek)]}
                    />
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
