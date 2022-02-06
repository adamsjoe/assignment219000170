import './App.css';
import React from 'react';
import QuestionPage from './pages/QuesionPage';
import ProblemIndex from './pages/ProblemIndex';
import { Route, Link } from 'react-router-dom';
import logo from './icons/iCog-icon.svg';
import Login from './pages/LoginPage';


function App() {
    return (
    <div className='container'>
      <div className="row">
        <nav className='navbar navbar-default navbar-expand-lg headingLine'>
          <div className="container-fluid ">
            <div className='navbar-header'>
              <img src={logo} alt='logo' width='50px'/>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/" className="nav-link">Problem Index</Link></li>
              <li><Link to="/generator" className="disabled-link nav-link">Problem Generator</Link></li>
              <li><Link to="/login" className="nav-link">Login Or Signup</Link></li>
            </ul>
          </div>
        </nav>        
      </div> 

      <Route exact path="/"><ProblemIndex /></Route>
      <Route exact path="/balances"><QuestionPage /></Route>
      <Route exact path="/login"><Login /></Route>

    </div>
  );
}

export default App;
