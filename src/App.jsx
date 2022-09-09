import { Context } from "./context/context";
import { Header } from "./components/header/header";
import { Calendar } from "./components/calendar/calendar";
import Card from "react-bootstrap/Card";

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
