import React from 'react';
import '../components/livealert.js';
import '../components/styles.scss';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { Inventory } from '../classes/Inventory';
import { getInventory } from '../connections/inventoryFunctions';

/**
 * Allows managers to edit the price of an item
 * in the inventory.
 * @author Molly Frost
 */
const EditInventoryPrice = () => {
    const [message, setMessage] = useState(null);

    // const dropDownPlaceholder = document.getElementById('inputGroupSelect01')
  
    const handleChange = event => {
      setMessage(event.target.value);
  
      console.log('value is:', event.target.value);
    };

    const [inventory, setInventory] = useState(new Inventory())

    useEffect(() => {
      async function getInv() {
        let data = await getInventory();
        var inv = new Inventory(data);
        setInventory(inv);
      }
      getInv();
    }, []);

    // var items = inventory.getItems;
    // console.log("items: ", inventory.getItems)
  
    // var itemsLen = items.length;
    //   for (let i = 0; i < itemsLen; i++){
    //     var curID = items[i].getInventoryID //get current menu item id
    //     var curName = items[i].getInventoryName //get current menu item name
  
    //     dropDownPlaceholder.innerHTML +=
    //       "<option value=\"" + curID + "\">" + curName + "</option>";
    //   }
  
    function checkSubmition() {
      const inventoryItem = document.getElementById('inputGroupSelect01');
      if (inventoryItem.value === '-1'){
        alert("ERROR: Please select an inventory item.");
      }else if (message === null | isNaN(+message) || Number.parseFloat(message) <= 0){
        alert("ERROR: Fill out a positive 'New Price Amount': $0.00");
      }else{
        const success = true;
        const price = Number.parseFloat(message).toFixed(2);
        //Boolean success = updatePrice(inventoryItem.value, price)
        if(success){
          inventory.updateInventoryPrice(inventoryItem.value, price);
          alert("SUCCESS: Inventory price successfully changed to $" + price + "!");
        }else{
          alert("ERROR: An error has occured. Please try again");
        }
      }
    }
    return (
        <div className="edit_menu_price">
          <ManagerNav />
          <div class="container">
            <div class="container overflow-hidden text-center">
              <h1 class="mb-3" style={{fontWeight: 800}}>Edit Inventory Price</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5 text-center">
              <div class="col-lg-4 text-center">
              <div class="input-group mb-3">
                  <label class="input-group-text text-white" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}} for="inputGroupSelect01">Select Inventory Item</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option value="-1" selected>Choose...</option>
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
                <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>New Price Amount($):</span>
                <input id="priceChange" type="double" onChange={handleChange} value={message} size="lg" class="form-control" placeholder="Enter new price..." aria-label="Enter new price..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
              </div>
            </div>
            <div class="col-lg-4 text-center">
                <div id="liveAlertPlaceholder"></div>
                <Button variant="panda-btn mt-3" onClick={checkSubmition} size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>SUBMIT</Button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
      );
}

export default EditInventoryPrice; 