import React, {useState, useEffect} from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import { getInventory } from '../connections/inventoryFunctions'
import { Inventory } from '../classes/Inventory'

/**
 * Deletes an item from the inventory.
 * @author Molly Frost
 */
const DeleteInventoryItem = () => {

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
      if (inventoryItem.value === '-1'){
        alert("ERROR: Please select an inventory item.");
      }else{
        const success = true;
        //Boolean success = deleteInventoryItem(inventoryItem.value)
        if(success){
          inventory.deleteFromInventory(inventoryItem.value);
          alert("SUCCESS: Inventory item was successfully deleted!");
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
              <h1 class="mb-3" style={{fontWeight: 800}}>Delete Inventory Item</h1>
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
                <div id="liveAlertPlaceholder"></div>
                <Button variant="panda-btn mt-3" onClick={checkSubmition} size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>DELETE</Button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
      );
}

export default DeleteInventoryItem; 