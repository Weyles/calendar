import { Context } from "./components/context";
import Header from "./components/header/header";
import Card from "react-bootstrap/Card";
import Calendar from "./components/calendar";

function App() {
  return (
    <Context>
      <Card>
        <Card.Header>
          <Header />
        </Card.Header>
        <Card.Body>
          <Calendar />
        </Card.Body>
      </Card>
    </Context>
  );
}

export default App;
