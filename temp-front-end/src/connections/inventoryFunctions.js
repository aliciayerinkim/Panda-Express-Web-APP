/**
* This file will contain all the functions that will fetch appropriate routes to get data from the database or edit the database
* @author Alicia Kim - 131003034
*/

import moment from 'moment';

/**
  * Get a next available inventory_id in the inventory table in databse by fetching appropriate routes and adding 1 to the response
  * @param {}
  * @return {number} - next available inventory_id
  */
async function findNextInventoryId() {     
    const response = await fetch('http://localhost:2000/api/v1/students/inventoryID')
    const data = await response.json()
    const nextVal = data[0].inventory_id + 1
    return nextVal
}

/**
  * Get a next available inventory_order_id in the inventory_order table in databse by fetching appropriate routes and adding 1 to the response
  * @param {}
  * @return {number} - next available inventory_order_id
  */
async function findNextInventoryOrderId() {
    const response = await fetch('http://localhost:2000/api/v1/students/inventoryOrderID')
    const data = await response.json()
    const nextVal = data[0].inventory_order_id + 1
    return nextVal
}

/**
  * Get a all the data of inventory table in databse by fetching appropriate routes in json
  * @param {}
  * @return {json} - all the data of inventory table in databse in json
  */
async function getInventory() {
    const response = await fetch('http://localhost:2000/api/v1/students/inventory')
    const data = await response.json()
    return data;
}

/**
  * Add a new row in inventory table in database using parameters given and inventory_id found by using await
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} inventoryName - the name of new inventory item to be added
  * @param {number} itemType - the type of new inventory item to be added
  * @param {number} unitPrice - the unit purchase of new inventory item to be added
  * @param {number} quantity - the quantity of new inventory item to be added
  * @return {}
  */
async function addInventoryItem(inventoryName, itemType, unitPrice, quantity) {
    const inventoryID = await findNextInventoryId()
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryId: inventoryID, inventoryName: inventoryName, itemType: itemType, unitPrice: unitPrice, quantity: quantity})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/inventory/add', request)
    const data = await response.json()
}

/**
  * Delete a specific row in inventory table in database using parameters given 
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} inventoryName - the name of inventory item to be deleted
  * @return {}
  */
async function deleteInventoryItem(inventoryName) {
    const requestOMB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryName: inventoryName})
    }
    const responseOMD = await fetch('http://localhost:2000/api/v1/students/inventory/delete', requestOMB)
    const dataOMD = await responseOMD.json()
}

/**
  * Update a specific row in inventory table in database using parameters given
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} inventoryName - the name of inventory item to be updated
  * @param {number} unitPrice - the new unit purchase of specific inventory item that needs to be updated
  * @return {}
  */
async function updateInventoryItemPrice(inventoryName, unitPrice) {
    const requestOMB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryName: inventoryName, unitPrice: unitPrice})
    }
    const responseOMD = await fetch('http://localhost:2000/api/v1/students/inventory/updateprice', requestOMB)
    const dataOMD = await responseOMD.json()
}

/**
  * Update a specific row in inventory table in database using parameters given
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} inventoryName - the name of inventory item to be updated
  * @param {number} quantity - the quantity of specific inventory item that needs to be updated
  * @return {}
  */
async function updateInventoryItemQuantity(inventoryName, quantity) {
    const requestOMB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryName: inventoryName, quantity: quantity})
    }
    const responseOMD = await fetch('http://localhost:2000/api/v1/students/inventory/updatequantity', requestOMB)
    const dataOMD = await responseOMD.json()
}

/**
  * Add a new row in inventory_order_id table in database using parameters given with inventory_order_id found bu using await
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryId - the id of new inventory_order to be added
  * @param {number} orderQuantity - the ordered quantity of new inventory_order to be added
  * @param {number} orderPrice - the ordered price of new inventory_order to be added
  * @param {number} afterQuantity - the new quantity of new inventory_order to be added
  * @return {}
  */
async function addInventoryOrder(inventoryId, orderQuantity, orderPrice, afterQuantity) {
    const inventoryOrderID = await findNextInventoryOrderId()
    const timeStamp = moment().format('YYYY-MM-DD hh:mm:ss');

    const requestOMB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryOrderID: inventoryOrderID, inventoryId: inventoryId, orderQuantity: orderQuantity, timeStamp: timeStamp, orderPrice: orderPrice, afterQuantity: afterQuantity})
    }
    const responseOMD = await fetch('http://localhost:2000/api/v1/students/inventoryorder/add', requestOMB)
    const dataOMD = await responseOMD.json()
}

export {
    findNextInventoryId,
    findNextInventoryOrderId,
    getInventory,
    addInventoryItem,
    deleteInventoryItem,
    updateInventoryItemPrice,
    updateInventoryItemQuantity,
    addInventoryOrder,
}
