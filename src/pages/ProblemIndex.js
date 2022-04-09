import { Link } from 'react-router-dom';
import {Route} from 'react-router-dom';
import QuestionPage from './QuestionPage';

function ProblemIndex(props) {
  return (
    <>
    <Route exact path="/balances">
      <QuestionPage auth={props.auth} isAdmin={props.admin}/>
    </Route>
    <Route exact path="/">
    <div className="row">
      <h1 className="text-center">Problem Index</h1>
      <div className="row">
        <h2>Contraptions</h2>
      </div>
      <div className="row">
        <ul>
          <li className='noBullets'><Link to="/balances" className='funkyNav'>Balances</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Clock</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Cogs</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Conical pendulum</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Forces on a body</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Lego tower</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Moment of inertia</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Momentum</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Pistons</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Pulley balance</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Pulley dynamics 1</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Quantitative cogs</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Rolling toy</Link></li>
          <li className='noBullets'><Link to="/balances" className='funkyNav disabled-link'>Trebuchet weight </Link></li>
        </ul>
      </div>
    </div>
    </Route>
    </> 
  )
}

export default ProblemIndex;