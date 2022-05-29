import { useState } from 'react';
import { NavbarBrand, Nav, NavbarToggler, Collapse, Navbar  } from 'reactstrap';

import DropdownList from './DropdownList';
import NavBarForm from './NavbarForm';

const brandStyle = { color: '#ffffff' };

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="td" vertical>
      <NavbarBrand style={brandStyle}>Earthquakes</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <DropdownList />
          <NavBarForm />
        </Nav>
      </Collapse>
    </Navbar>
    // <Nav className="col-md-2 d-none d-md-block bg-dark sidebar">
    //   <NavItem>
    //     <p>Earthquakes</p>
    //   </NavItem>
    // </Nav>
  );
}
