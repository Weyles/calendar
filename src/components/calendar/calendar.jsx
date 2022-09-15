import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Item } from "./item/item";
import "./calendar.css";
import { areEqual } from "../../utility/functions";
import { useCalendarDataContext } from "../../context/context";

const Calendar = () => {
  const { data } = useCalendarDataContext(); // Get data from Context component

  const currentDate = new Date();

  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          {data.map((week, index) => (
            <tr key={index}>
              {week.map((dateInWeek, index) =>
                dateInWeek ? (
                  <td
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
