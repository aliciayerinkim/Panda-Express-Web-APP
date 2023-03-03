/**
* This file will contain a functions that will fetch appropriate routes to get data from the database or edit the database
* @author Justin Van Nimwegen - 930005547
*/

/**
  * Get a next available menu_item_id in the menu_item table in databse by fetching appropriate routes and adding 1 to the response
  * @param {}
  * @return {number} - next available inventory_id
  */
async function findNextMenuId() {    
    const response = await fetch('http://localhost:2000/api/v1/students/menuItems/menuId')
    const data = await response.json()
    const nextVal = data[0].menu_item_id + 1
    return nextVal
}

/**
  * Get a all data of menu_item table in databse ordered by menu_item_id by fetching appropriate routes in json
  * @param {}
  * @return {json} - all data of menu_item table in databse ordered by menu_item_id
  */
async function updateMenu() {
    const response = await fetch('http://localhost:2000/api/v1/students/menuItems')
    const data = await response.json()
    return data;
}

/**
  * Add a new row in menu_item table in database using parameters given and inventory_id found by using await
  * Add a new row in ingredient_bridge table in database for every ingredients the parameter has
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {class} menu - MenuItem class
  * @return {}
  */
async function addMenuItem(menu) {
    // Updating menu item table
    const menuID = await findNextMenuId()
    const requestAMI = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({menuItemId: menuID, productName: menu.getProductName, salePrice: menu.getSalePrice, category: menu.getCategory})
    }
    const responseAMI = await fetch('http://localhost:2000/api/v1/students/menuItems/add', requestAMI)
    const dataOMD = await responseAMI.json()

    // Updating menu/ingredient Bridge Table
    for(let i = 0; i < menu.getIngredients.length; i++) {
        const requestING = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredient: menu.getIngredients[i].getInventoryID, menu_item_id: menuID})
        }
        const responseING = await fetch('http://localhost:2000/api/v1/students/menuItems/add/ing', requestING)
        const dataING = await responseING.json()
    }

}

/**
  * Delete a specific row in menu_item table in database using parameters given 
  * Delete a specific row in ingredient_bridge table in database for every ingredients the parameter has
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {class} menu - MenuItem class
  * @return {}
  */
async function deleteMenuItem(menu) {
    // Updating menu item table
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({menuItemId: menu.getMenuItemId})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/menuItems/delete', request)
    const data = await response.json()
    
    //Updating menyu/ingredient Bridge Table
    const requestING = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({menu_item_id: menu.getMenuItemId})
    }
    const responseING = await fetch('http://localhost:2000/api/v1/students/menuItems/delete/ing', requestING)
    const dataING = await responseING.json()
}

/**
  * Update a specific row in menu_item table in database using parameters given
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} menuItemId - the id of menu item to be updated
  * @param {number} newPrice - the new pricw of specific menu item that needs to be updated
  * @return {}
  */
async function changeMenuPrice(menuItemId, newPrice) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({salePrice: newPrice, menuItem: menuItemId})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/menuItems/update', request)
    const data = await response.json()
}

/**
  * Get a product name from data of menu_item table in databse with specific menu_item_id
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} menuItemId - menu_item_id of specific menu item wanted
  * @return {json} - menu name that has specific menu_item_id given in parameter
  */
async function getMenuItemName(menuItemId) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({menu_item_id: menuItemId})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/menuItems/getMenuItemName', request)
    const data = await response.json()
    
    if (data.length > 0) {
        return data[0].product_name
    }
    return ""
}

export {
    updateMenu,
    addMenuItem,
    findNextMenuId,
    deleteMenuItem,
    changeMenuPrice,

    getMenuItemName,
}

