import React, {useState, useEffect} from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import { Menu } from "../classes/Menu";
import { updateMenu } from "../connections/menuFunctions";

/**
 * Deletes an item from the menu.
 * @author Molly Frost, Joseph Quismorio
 */
const DeleteMenuItem = () => {
  
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
  // //console.log("items: ", menu.getItems)

  // var itemsLen = items.length;
  //   for (let i = 0; i < itemsLen; i++){
  //     var curMenuID = items[i].getMenuItemId //get current menu item id
  //     var curMenuName = items[i].getProductName //get current menu item name

  //     dropDownPlaceholder.innerHTML +=
  //       "<option value=\"" + curMenuID + "\">" + curMenuName + "</option>";
  //   }

    function checkSubmition() {
      const menuItem = document.getElementById('inputGroupSelect01');
      if (menuItem.value <= 0){
        alert("ERROR: Please select a menu item.");
      }else{
        const success = true;
        if(success){
          menu.deleteFromMenu(parseInt(menuItem.value));
          alert("SUCCESS: Menu item was successfully deleted!");
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
              <h1 class="mb-3" style={{fontWeight: 800}}>Delete Menu Item</h1>
            </div>
            <div class="row align-items-center justify-content-center my-5 text-center">
              <div class="col-lg-4 text-center">
              <div class="input-group mb-3">
                  <label class="input-group-text text-white" style={{backgroundColor: '#D02B2E', fontWeight: 800, color: '#D02B2E'}} for="inputGroupSelect01">Select Menu Item</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option value="-1" selected>Choose...</option>
                    { 
                      menu.getItems.map((item) => (
                        <option value={`${item.getMenuItemId }`}>{item.getProductName}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            <div class="col-lg-4 text-center">
                <Button variant="panda-btn mt-3" onClick={checkSubmition} size="medium" class="bg-red text-white btn" style={{fontWeight: 800}}>DELETE</Button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
      );
}
export default DeleteMenuItem; 
