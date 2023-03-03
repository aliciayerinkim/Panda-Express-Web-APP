import React from 'react';
import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';

function EditPrice(){
  return (
    <div>
      <ManagerNav />
      <div class="container overflow-hidden text-center">
        <h1 class="mb-3" style={{fontWeight: 800}}>Edit Menu Item</h1>
        <div class="row gx-5">
          <div class="col align-items-middle justify-content-center">
            <Button variant="panda-btn mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/edit-price/edit-menu-price' style={{fontWeight: 800}}>EDIT MENU PRICE</Button>
          </div>
          <div class="col">
            <Button variant="panda-btn mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/edit-price/edit-inventory-price' style={{fontWeight: 800}}>EDIT INVENTORY PRICE</Button>
          </div>
        </div>
        <Footer/>
      </div>
    </div>  
  );
}
    
    export default EditPrice; 