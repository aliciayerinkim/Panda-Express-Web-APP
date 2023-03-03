import React from 'react';
import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import { Button } from 'react-bootstrap';

/**
 * Manager dashboard view. Allows the manager
 * to access functions related to reports,
 * inventory, and the current menu.
 * @param {Setter} setCart - The setter function for the current cart.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @param {Setter} setIsManager - The setter function for the current manager status.
 * @author Molly Frost, Aaron Su
 */

function ManagerDashboard({setCart, setUser, setIsLoggedIn, setIsManager}){
    return (
        <div className="manager-dashboard">
          <ManagerNav setCart={setCart} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager} />
          <div class="container">
            <div class="row align-items-center justify-content-center my-5">
              <div class="col-lg-4 text-center">
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/view-inventory' style={{fontWeight: 800}}>INVENTORY DASHBOARD</Button>
              </div>
            </div>
            <div class="row align-items-center justify-content-center my-5">
              <div class="col-lg-4 text-center">
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/edit-menu-item' style={{fontWeight: 800}}>EDIT MENU</Button>
              </div>
              <div class="col-lg-4 text-center">
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/reports' style={{fontWeight: 800}}>REPORTS</Button>
              </div>
            </div>
          </div>
        </div>
      );
}
export default ManagerDashboard; 
