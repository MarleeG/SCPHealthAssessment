import { Container, Jumbotron } from "react-bootstrap";
import Input from "./components/Input";

import "./App.css";
const App = () => {
  const Header = (
    <Jumbotron fluid>
      <Container>
        <h1>Weather Statistics</h1>
      </Container>
    </Jumbotron>
  );

  return (
    <div className="App">
      {Header}
      <Input />
    </div>
  );
};

export default App;