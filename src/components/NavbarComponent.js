import '../styles/Navbar.css';
import React from 'react';
import logo from '../icons/iCog-icon.svg';

function NavbarComponent() {
  return (
    <nav className='navbar navbar-default navbar-expand-lg headingLine'>
      <div className="container-fluid ">
        <div className='navbar-header'>
          <img src={logo} alt='logo' width='50px'/>
        </div>
        <ul className="nav navbar-nav">
          <li><a className="nav-link" href="#">Problem Index</a></li>
          <li><a className="nav-link disabled" href="#">Problem Generator</a></li>
          <li><a className="nav-link" href="#">Log in or Sign Up</a></li>
        </ul>
        </div>
      {/* </div> */}
    </nav>
  )
}

export default NavbarComponent;