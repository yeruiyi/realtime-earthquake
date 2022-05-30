// import { useState } from 'react';
// import { NavbarBrand, Nav, NavbarToggler, Collapse, Navbar  } from 'reactstrap';
import styled from 'styled-components';
import DropdownList from './DropdownList';
import NavBarForm from './NavbarForm';
import TextData from './TextData';
// const brandStyle = { color: '#ffffff' };

export default function NavBar() {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Sidebar>
      <NavContainer>
        <Header>Earthquake</Header>
        <DropdownList/>
        <NavBarForm/>
        <TextData/>
      </NavContainer>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  height: 100vh;
  width: 20%;
  float: left;
  overflow: auto;
  background-color:#232C33;
`;

const Header = styled.div`
  color:#ffffff;
  font-size: 2em;
  margin-bottom: 50px;
`;

const NavContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;


