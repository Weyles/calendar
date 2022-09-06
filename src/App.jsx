import { Context } from "./components/context";
import { Header } from "./components/header";
import { Calendar } from "./components/calendar";
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
