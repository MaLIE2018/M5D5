import { Row, Col } from "react-bootstrap";
import "../styles/css/footer.css";

const Footer = () => {
  return (
    <footer className='d-flex justify-content-center fixed-bottom'>
      <Row className='w-75'>
        <Col>
          <ul>
            <li>About us</li>
            <li>Terms and Conditions</li>
            <li>Privacy</li>
          </ul>
        </Col>
        <Col>
          <ul>
            <li>More books</li>
            <li>Even more books</li>
            <li>Test</li>
          </ul>
        </Col>
        <Col>
          <ul>
            <li>Some more footer Stuff</li>
            <li>Even more footer stuff</li>
            <li>End</li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
