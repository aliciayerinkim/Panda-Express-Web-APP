import React from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button, Form, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { updateMenu } from "../connections/menuFunctions";
import { getInventory } from '../connections/inventoryFunctions';
import { Menu } from "../classes/Menu";
import { Inventory } from "../classes/Inventory";

/**
 * Adds an item to the menu.
 * @author Molly Frost, Joseph Quismorio
 */
const AddMenuItem = () => {

  const [menu, setMenu] = useState(new Menu())

  useEffect(() => {
    async function getMenu() {
      let data = await updateMenu();
      var menuN = new Menu(data);
      setMenu(menuN);
    }
    getMenu();
  }, []);

  const [inventory, setInventory] = useState(new Inventory())

    useEffect(() => {
      async function getInv() {
        let data = await getInventory();
        var inv = new Inventory(data);
        setInventory(inv);
      }
      getInv();
    }, []);

  const [menuName, setMenuName] = useState(null);
  const [menuPrice, setMenuPrice] = useState(null);
  const [menuIngredients, setMenuIngredients] = useState([]);

  const handleChangeName = event => {
    setMenuName(event.target.value);
    console.log('value is:', event.target.value);
  };

  const handleChangePrice = event => {
    setMenuPrice(event.target.value);
    console.log('value is:', event.target.value);
  };

  console.log(menuIngredients)

  /**
   * Checks for the correct inputs in order to add
   * a menu item. If any of the inputs are invalid
   * or empty, returns an alert message signifying an error.
   */
  function checkSubmition() {
    const category = document.getElementById('inputGroupSelect01');
    if (category.value < 0){
      alert("ERROR: Please select a category.");
    }else if(menuName === null | !isNaN(+menuName)){
      alert("ERROR: Please fill out 'Name of Menu Item' correctly.");
    }else if (menuPrice === null | isNaN(+menuPrice) || Number.parseFloat(menuPrice) <= 0){
      alert("ERROR: Fill out a positive 'Price of Menu Item': $0.00");
    }else if(menuIngredients === null | !isNaN(+menuIngredients)){
      alert("ERROR: Please fill out 'Add Item's Ingredients' correctly.");
    }else{
      let success = true;
      const price = Number.parseFloat(menuPrice).toFixed(2);
      var ingredientStringArr = menuIngredients;
      var ingredLength = ingredientStringArr.length;
      for (let i = 0; i < ingredLength; i++){
        if(!inventory.checkInventoryItem(ingredientStringArr[i])){
          success = false;
          break;
        }
      }
      if(success){
        var ingredientArr = []
        for (let i = 0; i < ingredLength; i++){
          ingredientArr.push(inventory.getInventoryItemFromName(ingredientStringArr[i]))
        }
        console.log(ingredientArr);
        menu.addToMenu(menuName, price, category.value, ingredientArr );
        alert("SUCCESS: " + menuName + "was successfully changed added to the menu!");
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
              <h1 class="mb-3" style={{fontWeight: 800}}>Add Menu Item</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5 text-center">
              <div class="col-lg-4 text-center">
                <div class="input-group mb-3">
                  <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>Name of Menu Item:</span>
                  <input type="text" size="lg" onChange={handleChangeName} value={menuName} class="form-control" placeholder="Enter a name..." aria-label="Enter a name..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
                </div>
                <div class="input-group mb-3">
                  <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>Price of Menu Item:</span>
                  <input type="int" size="lg" onChange={handleChangePrice} value={menuPrice} class="form-control" placeholder="Enter a price..." aria-label="Enter a price..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
                </div>
                <div class="input-group mb-3">
                  <select class="form-select" id="inputGroupSelect01">
                    <option value="-1" selected>Select Category</option>
                    <option value="0">Side</option>
                    <option value="1">Entree</option>
                    <option value="2">Drink</option>
                    <option value="3">Seasonal Side</option>
                    <option value="4">Seasonal Entree</option>
                    <option value="5">Seasonal Drink</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                <Form.Group as={Col} controlId="my_multiselect_field">
                    <Form.Label>Choose Ingredients (Hold Ctrl/Cmd to select multiple)</Form.Label>
                    <Form.Control as="select" multiple onChange={e => setMenuIngredients([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                      { 
                        inventory.getItems.map((item) => (
                          <option value={`${item.getInventoryName}`}>{item.getInventoryName}</option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>
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

export default AddMenuItem; 