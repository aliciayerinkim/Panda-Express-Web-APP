import React from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Manager nav bar.
 * @param {Setter} setCart - The setter function for the current cart.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @param {Setter} setIsManager - The setter function for the current manager status.
 * @author Joseph Quismorio
 */
function ManagerNav({setCart, setUser, setIsLoggedIn, setIsManager}) {
  const navigate = useNavigate();

  function handleSignout(event) {
    setCart([]);
    setUser({});
    setIsLoggedIn(false);
    setIsManager(false);
    navigate('/login');
  }

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-red">
        <div className="container">
          <NavLink className="navbar-brand" to="/manager-dashboard">
            <img src={require("../images/PandaExpressLogo.png")} alt="" class="img-fluid app-logo"/>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-2">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: 'white', fontWeight: 800, color: '#D02B2E'}}>
                    <span class="fi fi-us"></span> EN
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/"><span class="fi fi-es"></span> ES</a></li>
                    <li><a class="dropdown-item" href="/"><span class="fi fi-fr"></span> FR</a></li>
                    <li><a class="dropdown-item" href="/"><span class="fi fi-cn"></span> CN</a></li>
                    <li><a class="dropdown-item" href="/"><span class="fi fi-jp"></span> JP</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button variant="panda-btn-alt" href='/dashboard' style={{fontWeight: 800, color: '#D02B2E'}}>SERVER VIEW</Button>{' '}
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button variant="panda-btn-alt" onClick={() => navigate('/dashboard/checkout')} style={{fontWeight: 800, color: '#D02B2E'}}>CURRENT ORDER</Button>{' '}
              </li>
              <li className="nav-item nav-btn mx-2">
                <Button disabled={
                  window.location.pathname === '/manager-dashboard/edit-menu-item' ||
                  window.location.pathname === '/manager-dashboard/edit-menu-item/add-menu-item' ||
                  window.location.pathname === '/manager-dashboard/edit-menu-item/delete-menu-item' ||
                  window.location.pathname === '/manager-dashboard/edit-price/edit-menu-price' ||
                  window.location.pathname === '/manager-dashboard/edit-inventory-item' ||
                  window.location.pathname === '/manager-dashboard/view-inventory/add-inventory-item' ||
                  window.location.pathname === '/manager-dashboard/view-inventory/delete-inventory-item' ||
                  window.location.pathname === '/manager-dashboard/view-inventory/edit-inventory-price' ||
                  window.location.pathname === '/manager-dashboard/order-inventory' ||
                  window.location.pathname === '/manager-dashboard/view-inventory' ||
                  window.location.pathname === '/manager-dashboard/reports'}
                variant="panda-btn-alt" onClick={(event) => handleSignout(event)} style={{fontWeight: 800, color: '#D02B2E'}}>SIGN OUT</Button>{' '}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default ManagerNav;