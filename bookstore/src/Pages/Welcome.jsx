import { Jumbotron, Container } from "react-bootstrap";
import "../styles/css/welcome.css";

const Welcome = () => {
  return (
    <Jumbotron className='fluid d-flex justify-content-center align-items-center mb-0'>
      <Container>
        <h1>My Shop</h1>
        <p>This is my Shop</p>
      </Container>
    </Jumbotron>
  );
};

export default Welcome;
