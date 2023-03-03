import React from 'react';
import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getInventory } from '../connections/inventoryFunctions'
import { Inventory } from '../classes/Inventory'

/**
 * Allows a manager to order more of an inventory item.
 * @author Molly Frost
 */
const InventoryOrder = () => {
    const [message, setMessage] = useState(null);
  
    const handleChange = event => {
      setMessage(event.target.value);
  
      console.log('value is:', event.target.value);
    };

    function isPositiveInt(value) {
      if (isNaN(value)) {
        return false;
      }
      var x = parseFloat(value);
      if (x <= 0){
        return false;
      }
      return (x | 0) === x;
    }

    const [inventory, setInventory] = useState(new Inventory())

    useEffect(() => {
      async function getInv() {
        let data = await getInventory();
        var inv = new Inventory(data);
        setInventory(inv);
      }
      getInv();
    }, []);

    function checkSubmition() {
      const inventoryItem = document.getElementById('inputGroupSelect01');
      if (inventoryItem.value === '0' || message === null || !isPositiveInt(message)){
        alert("ERROR: Please fill out each attribute correctly.");
      }else{
        const success = true;
        //Boolean success = changePrice(menuItem.value, newPrice.value)
        if(success){
          alert("SUCCESS: Inventory successfully ordered " + message + " more of the item!");
          inventory.updateInventoryQuantity(inventoryItem.value, message);
        }else{
          alert("ERROR: An error has occured. Please try again");
        }
      }
    }
    return (
        <div className="inverntory_order">
          <ManagerNav />
          
          <div id="liveAlertPlaceholder"></div>
          <div class="container">
            <div class="container overflow-hidden text-center">
              <h1 class="mb-3" style={{fontWeight: 800}}>Order Inventory</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5">
              <div class="col-lg-4 text-center">
                <div class="input-group mb-3">
                    <label variant="panda-btn btn-block mt-3" class="input-group-text text-white" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}} for="inputGroupSelect01">Select Inventory Item</label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option value="0" selected>Choose...</option>
                        { 
                        inventory.getItems.map((item) => (
                          <option value={`${item.getInventoryName}`}>{item.getInventoryName}</option>
                        ))
                      }
                    </select>
                  </div>
              </div>
              <div class="col-lg-4 text-center">
              <div class="input-group mb-3">
                <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>Amount:</span>
                <input id="priceChange" type="int" onChange={handleChange} value={message} size="lg" class="form-control" placeholder="Enter a positive quantity..." aria-label="Enter a positive quantity..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
              </div>
              </div>
              <div class="col-lg-4 text-center">
                <Button variant="panda-btn mt-3" onClick={checkSubmition} size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>SUBMIT</Button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
      );
}

export default InventoryOrder; 