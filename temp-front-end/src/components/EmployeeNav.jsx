import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Employee nav bar. Manager view button is
 * disabled based on employee status (is a manager or not).
 * @param {Setter} setCart - The setter function for the current cart.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @param {Setter} setIsManager - The setter function for the current manager status.
 * @author Joseph Quismorio
 */
function EmployeeNav({setCart, setUser, setIsLoggedIn, setIsManager}) {
  const navigate = useNavigate();

  function handleManagerView() {
    if(localStorage.getItem('isManager') === 'true'){
      navigate('/manager-dashboard');
    }
  }

  function handleSignout(event) {
    setCart([]);
    setUser({});
    setIsLoggedIn(false);
    setIsManager(false);
    navigate('/login');
  }

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand fixed-top navbar-dark bg-red">
        <div className="container">
          <NavLink className="navbar-brand" to="/dashboard">
            <img src={require("../images/PandaExpressLogo.png")} alt="" className="img-fluid app-logo"/>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-2">
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: 'white', fontWeight: 800, color: '#D02B2E'}}>
                    <span className="fi fi-us"></span> EN
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/"><span className="fi fi-es"></span> ES</a></li>
                    <li><a className="dropdown-item" href="/"><span className="fi fi-fr"></span> FR</a></li>
                    <li><a className="dropdown-item" href="/"><span className="fi fi-cn"></span> CN</a></li>
                    <li><a className="dropdown-item" href="/"><span className="fi fi-jp"></span> JP</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button disabled={localStorage.getItem('isManager') === 'false'} variant="panda-btn-alt" onClick={() => handleManagerView()} style={{fontWeight: 800, color: '#D02B2E'}}>MANAGER VIEW</Button>{' '}
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button variant="panda-btn-alt" onClick={() => navigate('/dashboard/checkout')} style={{fontWeight: 800, color: '#D02B2E'}}>CURRENT ORDER</Button>{' '}
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button disabled={(window.location.pathname === '/dashboard/create-order/') || (window.location.pathname === '/dashboard/checkout')} variant="panda-btn-alt" onClick={(event) => handleSignout(event)} style={{fontWeight: 800, color: '#D02B2E'}}>SIGN OUT</Button>{' '}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default EmployeeNav;
