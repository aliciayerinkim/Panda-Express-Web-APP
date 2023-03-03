/**
* This file will contain functions that will fetch appropriate routes to get data from the database or edit the database
* @author Justin Van Nimwegen - 930005547
*/

/**
  * Get data for sells report, with start time and end time given as parameter
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} startTime - start time of sells report
  * @param {string} endTime - end time of sells report
  * @return {json} - data for sells report between start time and end time
  */
async function sellsTogetherData(startTime, endTime) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({startTime: startTime, endTime: endTime})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/sellstogether', request)
    const data= await response.json()
    return data;
}

/**
  * Get data for sales report, with inventory id, start time, and end time given as parameter
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryId - id of inventory item needed for sales report
  * @param {string} startTime - start time of sells report
  * @param {string} endTime - end time of sells report
  * @return {json} - data for sales report for specific inventory item between start time and end time
  */
async function salesReport(inventoryId, startTime, endTime) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({inventoryId: inventoryId,startTime: startTime, endTime: endTime})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/salesReport', request)
    const data= await response.json()
    return data;
}

// Excess Report Functions

/**
  * Get lowest time_stamp from inventory_order table in database by fetching appropriate route
  * @param {}
  * @return {json} - lowest time_stamp from inventory_order table in database
  */
async function getMinDate() {    
    const response = await fetch('http://localhost:2000/api/v1/students/reports/excess/getMinDate')
    const data = await response.json()
    return data
}

/**
  * gets the earlist timestamp from a specific date
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryItemId - the id of new inventory_order to be added
  * @return {json} - JSON of a the earlist timestamo from the target date
  */
async function inventoryOrderSQLStr(targetDate) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({targetDate: targetDate})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/excess/inventoryOrderSQLStr', request)
    const data= await response.json()
    return data;
}

/**
  * Helper function for excess report, gets amount sold of an addon ingredient over period of time
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryItemId - the id of the requested inventory item
  * @param {string} startDate - start time for restock report
  * @param {string} targetDate - end time fpr restock report
  * @return {json} - JSON ofamount sold of an addon over period of time
  */
async function orderJoinSQLStr1(InventoryItemId, startDate, targetDate) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({InventoryItemId: InventoryItemId, startDate: startDate, targetDate: targetDate})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/excess/orderJoinSQLStr1', request)
    const data= await response.json()
    return data;
}

/**
  * Helper function for excess report, gets amount sold of an ingredent within entree over period of time
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryItemId - the id of the requested inventory item
  * @param {string} startDate - start time for restock report
  * @param {string} targetDate - end time fpr restock report
  * @return {json} - JSON ofamount sold of an addon over period of time
  */
async function orderJoinSQLStr2(InventoryItemId, startDate, targetDate) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({InventoryItemId: InventoryItemId, startDate: startDate, targetDate: targetDate})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/excess/orderJoinSQLStr2', request)
    const data= await response.json()
    return data;
}

/**
  * Get the sum of the data from inventory_order table in database using parameters
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} inventoryItemId - the id of new inventory_order to be added
  * @param {string} begin - start time for restock report
  * @param {string} end - end time fpr restock report
  * @return {json} - sum of the data from inventory_order table in database using parameters
  */
async function restockAmountSQLStr(inventoryItemId, begin, end) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({begin: begin, end: end, inventoryItemId: inventoryItemId})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/reports/excess/restockAmountSQLStr', request)
    const data= await response.json()
    return data;
}


export {
    sellsTogetherData,
    salesReport,

    getMinDate,
    inventoryOrderSQLStr,
    orderJoinSQLStr1,
    orderJoinSQLStr2,
    restockAmountSQLStr,
}