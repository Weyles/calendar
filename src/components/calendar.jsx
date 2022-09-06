import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useCalendarDataContext } from "./context";
import { useState } from "react";
import {
  isLeapYear,
  areEqual,
  getDaysInMonth,
  getDayOfWeek,
  getMonthData,
} from "../utility/functions";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getYearFunc = () => {
    console.log("DATA_YEAR:", date.getFullYear());
    return date.getFullYear();
  };

  const getMonthFunc = () => {
    console.log("DATA_MONTH:", date.getMonth());
    return date.getMonth();
  };

  const getDayFunc = () => {
    console.log("DATA_DAY:", date.getDate());
    return date.getDate();
  };

  const month = getMonthData(getYearFunc(), getMonthFunc());

  return (
    <Container fluid>
      <Table striped bordered hover>
        <tbody>
          {month.map((week, index) => (
            <tr key={index}>
              {week.map((date, index) =>
                date ? (
                  <td key={index}>{date.getDate()}</td>
                ) : (
                  <td key={index}></td>
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
