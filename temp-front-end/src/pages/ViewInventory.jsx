import React, {useState, useEffect}from 'react';
import '../components/styles.scss';
import '../components/livealert.js';
import ManagerNav from "../components/ManagerNav";
import Footer from "../components/Footer";
import { getInventory } from '../connections/inventoryFunctions'
import { Inventory } from '../classes/Inventory'
import { Button } from 'react-bootstrap';

/**
 * Allows managers to view the current
 * stock of the inventory, including price of
 * each inventory item and current quantity.
 * @author Molly Frost
 */

function ViewInventory(){
    const [inventory, setInventory] = useState(new Inventory())

    useEffect(() => {
      async function getInv() {
        let data = await getInventory();
        var inv = new Inventory(data);
        setInventory(inv);
      }
      getInv();
    }, []);

    return (
        <div className="view inventory">
          <ManagerNav /><div class="container overflow-hidden text-center">
            <h1 class="mb-3" style={{paddingTop: 40, fontWeight: 800}}>Inventory Dashboard</h1>
            <div class="row gx-5" style={{paddingTop: 10}}>
              <div class="col align-items-middle justify-content-center">
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/view-inventory/add-inventory-item' style={{fontWeight: 800}}>ADD INVENTORY ITEM</Button>
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/view-inventory/delete-inventory-item' style={{fontWeight: 800}}>DELETE INVENTORY ITEM</Button>
              </div>
              <div class="col">
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/view-inventory/edit-inventory-price' style={{fontWeight: 800}}>EDIT INVENTORY PRICE</Button>
                <Button variant="panda-btn btn-block mt-3" size="lg" class="bg-red text-white" href='/manager-dashboard/order-inventory' style={{fontWeight: 800}}>INVENTORY ORDER</Button>
              </div>
            </div>
          </div>
          <div className="container">
          <p class="fs-4" style={{paddingTop: 30, fontWeight: 800}}>Inventory:</p>
            <div className="container text-center">
              <h1 className="mb-3" style={{fontWeight: 800}}></h1>
            </div>
            <table className="table table-hover table-striped overflow-auto" style={{height: '60vh'}}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Inventory Item</th>
                  <th scope="col">Unit Purchase Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  inventory.getItems.map((item) => (
                    <tr>
                    <th scope="row">{item.getInventoryID}</th>
                    <td>{item.getInventoryName}</td>
                    <td>{item.getUnitPrice}</td>
                    <td>{item.getQuantity}</td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <br/>
          <br/>
          <Footer />
        </div>
    );
}

export default ViewInventory; 