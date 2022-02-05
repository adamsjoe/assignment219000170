import React from 'react';
import logo from '../icons/iCog-icon.svg';

function NavbarComponent() {
  return (
    // <nav className='navbar navbar-light' style={{'backgroundColor': '#FFFFFF'}}>
    <nav className='navbar navbar-expand-sm navbar-light bg-none'>
      <div className="container-fluid ">
        <div className='navbar-bramd'>
          <img src={logo} alt='logo' width='50px'/>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Problem Index</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Problem Generator</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Log in or Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent;