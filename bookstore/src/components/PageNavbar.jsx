import { Navbar, Nav } from "react-bootstrap";
import "../styles/css/pagenavbar.css";
import { Link } from "react-router-dom";

const PageNavbar = () => {
  return (
    <Navbar bg='light' variant='light'>
      <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
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
    </Navbar>
  );
};

export default PageNavbar;
