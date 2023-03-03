import React from 'react';
import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';

/**
 * Allows managers to edit menu items.
 * @author Molly Frost, Joseph Quismorio
 */
function EditMenuItem(){
    return (
    <div>
     <ManagerNav />
      <div class="container overflow-hidden text-center">
        <h1 class="mb-3" style={{paddingTop: 40,fontWeight: 800}}>Edit Menu Item</h1>
        <div class="row gx-5">
          <div class="col" style={{paddingTop: 20}}>
            <Button variant="panda-btn mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/edit-menu-item/add-menu-item' style={{ fontWeight: 800}}>ADD MENU ITEM</Button>
          </div>
          <div class="col" style={{paddingTop: 20}}>
            <Button variant="panda-btn mt-3" size="lg"  class="bg-red text-white" href='/manager-dashboard/edit-menu-item/delete-menu-item' style={{ fontWeight: 800}}>DELETE MENU ITEM</Button>
          </div>
          <div class="col align-items-middle justify-content-center" style={{paddingTop: 20}}>
            <Button variant="panda-btn mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/edit-price/edit-menu-price' style={{fontWeight: 800}}>EDIT MENU PRICE</Button>
          </div>
        </div>
        <Footer/>
      </div>
      </div>
    );
}
    
export default EditMenuItem; 