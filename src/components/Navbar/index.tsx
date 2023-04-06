import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';

const Navbar: React.FC = () => {
  return (
    <>
       <Nav>
            <NavLink to="/">
                <h1>Logo</h1>
            </NavLink>
        <Bars />
        <NavMenu>
            <NavLink to="/explore" activeStyle={{ fontWeight: 'bold' }}>
                Explore
            </NavLink>
            <NavLink to="/signin" activeStyle={{ fontWeight: 'bold' }}>
                Sign in
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/join" activeStyle={{ fontWeight: 'bold' }}>
                Join
            </NavBtnLink>
        </NavBtn>

       </Nav>
    </>
  );
};

export default Navbar;