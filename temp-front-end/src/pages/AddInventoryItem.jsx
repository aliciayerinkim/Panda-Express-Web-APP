import React from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { Inventory } from '../classes/Inventory';
import { getInventory } from '../connections/inventoryFunctions';

/**
 * Adds an item to inventory.
 * @author Molly Frost
 */
const AddInventoryItem = () => {

  const [inventoryName, setInventoryName] = useState(null);
  const [inventoryPrice, setInventoryPrice] = useState(null);

  const handleChangeName = event => {
    setInventoryName(event.target.value);
  };

  const handleChangePrice = event => {
    setInventoryPrice(event.target.value);
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

  /**
   * Checks for the correct inputs in order to add
   * an inventory item. If any of the inputs are invalid
   * or empty, returns an alert message signifying an error.
   */
  function checkSubmition() {
    const category = document.getElementById('inputGroupSelect01');
    if (category.value <= 0){
      alert("ERROR: Please select a category.");
    }else if(inventoryName === null | !isNaN(+inventoryName)){
      alert("ERROR: Please fill out 'Name of Inventory Item' correctly.");
    }else if (inventoryPrice === null | isNaN(+inventoryPrice) || Number.parseFloat(inventoryPrice) <= 0){
      alert("ERROR: Fill out a positive 'Price of Inventory Item': $0.00");
    }else{
      const price = Number.parseFloat(inventoryPrice).toFixed(2);
      const success = inventory.checkInventoryItem(inventoryName);
      if(success === false){
        inventory.addInventoryItem(inventoryName, category.value, price);
        alert("SUCCESS: Menu price successfully changed to $" + price + "!");
      }else{
        alert("ERROR: Item already exists. Please try a new name");
      }
    }
  }

    return (
        <div className="edit_menu_price">
          <ManagerNav />
          <div class="container">
            <div class="container overflow-hidden text-center">
              <h1 class="mb-3" style={{fontWeight: 800}}>Add Inventory Item</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5 text-center">
              <div class="col-lg-4 text-center">
                <div class="input-group mb-3">
                  <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>Name of Inventory Item:</span>
                  <input type="text" size="lg" class="form-control" onChange={handleChangeName} value={inventoryName} placeholder="Enter a name..." aria-label="Enter a name..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
                </div>
                <div class="input-group mb-3">
                  <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>Price of Inventory Item:</span>
                  <input type="int" size="lg" class="form-control" onChange={handleChangePrice} value={inventoryPrice} placeholder="Enter a price..." aria-label="Enter a price..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
                </div>
                <div class="input-group mb-3">
                  <select class="form-select" id="inputGroupSelect01">
                    <option value="-1" selected>Select Category</option>
                    <option value="1">Ingredient</option>
                    <option value="2">Drink</option>
                    <option value="3">Misc</option>
                  </select>
                </div>
                <div class="text-center mb-3">
                  <Button variant="panda-btn mt-3" onClick={checkSubmition} size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>SUBMIT</Button>
                </div>
              </div>
            </div>  
          </div>
          <Footer />
        </div>
    );
}

export default AddInventoryItem; 