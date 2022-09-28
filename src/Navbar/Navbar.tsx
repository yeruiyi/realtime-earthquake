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
        <DropdownList/>
        <NavBarForm/>
        <TextData/>
      </NavContainer>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  background-color:#232C33;
`;

// const Header = styled.div`
//   color:#ffffff;
//   font-size: 2em;
//   margin-bottom: 50px;
//   margin-top: 30px;
// `;

const NavContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;


