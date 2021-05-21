import { Navbar, Nav, FormControl, Button } from "react-bootstrap";
import "../styles/css/pagenavbar.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg='light' variant='light' className='fixed-top'>
      <Navbar.Brand as={Link} to='/welcome'>
        Bookstore
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link as={Link} to='/Welcome'>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to='/LatestReleases'>
          Latest Releases
        </Nav.Link>
        <Nav.Link>About</Nav.Link>
        <Nav.Link as={Link} to='/backoffice'>
          BackOffice
        </Nav.Link>
      </Nav>
      <Nav>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-success'>Search</Button>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
