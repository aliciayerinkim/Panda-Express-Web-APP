import React from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import { Menu } from "../classes/Menu";
import { updateMenu } from "../connections/menuFunctions"
import { useState, useEffect } from 'react';

/**
 * Allows managers to edit the price of
 * an item in the menu.
 * @author Molly Frost, Joseph Quismorio
 */
const EditMenuPrice = () => {
  const [message, setMessage] = useState('');

  const dropDownPlaceholder = document.getElementById('add_to_me')

  const [menu, setMenu] = useState(new Menu())
  //var menu = new Menu();
  useEffect(() => {
    async function getMenu() {
      let data = await updateMenu();
      var menuN = new Menu(data);
      setMenu(menuN);
    }
    getMenu();
  }, []);
  //console.log(menu)
  // var items = menu.getItems;
  // console.log("items: ", menu.getItems)

  // var itemsLen = items.length;
  //   for (let i = 0; i < itemsLen; i++){
  //     var curMenuID = items[i].getMenuItemId //get current menu item id
  //     var curMenuName = items[i].getProductName //get current menu item name

  //     dropDownPlaceholder.innerHTML +=
  //       "<option value=\"" + curMenuID + "\">" + curMenuName + "</option>";
  //   }

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  function checkSubmition() {
    const menuItem = document.getElementById('inputGroupSelect01');
    //const newPrice = document.getElementById('priceChange');
    if (menuItem.value <= 0){
      alert("ERROR: Please select a menu item.");
    }else if (message === null | isNaN(+message) || Number.parseFloat(message) <= 0){
      alert("ERROR: Fill out a positive 'New Price Amount': $0.00");
    }else{
      const success = true;
      const price = Number.parseFloat(message).toFixed(2);
      console.log(menuItem.value)
      console.log(price)
      menu.updatePrice(parseInt(menuItem.value), price)
      if(success){
        alert("SUCCESS: Menu price successfully changed to $" + price + "!");
        console.log("Sides: ", menu.getAllSides)
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
              <h1 class="mb-3" style={{fontWeight: 800}}>Edit Menu Price</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5 text-center">
              <div class="col-lg-4 text-center">
                <div class="input-group mb-3">
                  <span variant="panda-btn btn-block mt-3" class="bg-red btn text-white" size="lg" id="basic-addon1" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}}>New Price Amount($):</span>
                  <input id="priceChange" type="double" onChange={handleChange} value={message} size="lg" class="form-control" placeholder="Enter new price..." aria-label="Enter new price..." aria-describedby="basic-addon1" style={{fontWeight: 800}}></input>
                </div>
              </div>
              <div class="col-lg-4 text-center">
              <div class="input-group mb-3">
                  <label class="input-group-text text-white" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}} for="inputGroupSelect01">Select Menu Item</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option value="-1" selected>Choose...</option>
                    { 
                      menu.getItems.map((item) => (
                        <option value={`${item.getMenuItemId}`}>{item.getProductName}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            <div class="col-lg-4 text-center">
                <Button variant="panda-btn mt-3" onClick={checkSubmition} id="liveAlertBtn" size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>SUBMIT</Button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
      );
  };

export default EditMenuPrice; 
