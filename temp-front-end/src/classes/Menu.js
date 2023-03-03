import { addMenuItem, findNextMenuId, deleteMenuItem, changeMenuPrice } from '../connections/menuFunctions'
/**
 * This class, MenuItem, holds all the information each MenuItem can hold
 * It also has constructor to create new MenuItem item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class MenuItem {
    private
        menuItemId = -1
        productName = ""
        salePrice = -1.0
        // Categories: 0 - Sides | 1 - Entrees | 2 - Drinks | 3 - Seasonal Sides | 4 - Seasonal Entrees | 5 - Seasonal Drinks
        category = -1;
        ingredients = []

    /**
     * Constructor to create a Meal MenuItem
     * @param {Number} _menuItemId - Menu Item ID
     * @param {String} _productName - Product Name
     * @param {Number} _salePrice - Sale Price of Menu Item
     * @param {Number} _category -  0 - Sides | 1 - Entrees | 2 - Drinks | 3 - Seasonal Sides | 4 - Seasonal Entrees | 5 - Seasonal Drinks
     * @param {Array} ingredients - Array of InventoryItem objects
     * @return {MenuItem} a constructed local MenuItem
     */
    constructor(_menuItemId, _productName, _salePrice, _category, ingredients = []) {
        this.menuItemId = _menuItemId
        this.productName = _productName
        this.salePrice = _salePrice
        this.category = _category;
        this.ingredients = ingredients
    }
    
    /**
     * Getter for Menu Item id
     * @return {Number} menuItemId
     */
    get getMenuItemId() {
        return this.menuItemId
    }

    /**
     * Getter for productName
     * @return {String} productName
     */
    get getProductName() {
        return this.productName
    }

    /**
     * Getter for salePrice
     * @return {Number} salePrice
     */
    get getSalePrice() {
        return this.salePrice
    }

    /**
     * Getter for category
     * @return {Number} category
     */
    get getCategory() {
        return this.category
    }

    /**
     * Getter for ingredients
     * @return {Array} ingredient array
     */
    get getIngredients() {
        return this.ingredients
    }

    /**
     * Sets price to new price
     * @param {Number} newPrice - Item Price
     */
    set setSalePrice(price) {
        this.salePrice = price
    }
}
/**
 * This class, Menu, holds all the information each Menu can hold
 * It also has constructor to create new Menu item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class Menu {
    private
        items = []
    /**
     * Constructor to create a Menu Object
     * @param {Array} data - Array of JSON object loaded from backend
     * @return {Menu} a constructed local Menu
     */
    constructor(data = []) {
        // Data is JSON object returned from menuFunctions.js updateMenu function
        this.items = [];
        for(let i = 0; i < data.length; i++) {
            var j = new MenuItem(data[i].menu_item_id, data[i].product_name, data[i].sale_price, data[i].category); 
            this.items.push(j)
        }
    }

    /**
     * Getter for items
     * @return {Array} array of MenuItems
     */
    get getItems() {
        return this.items
    }

    /**
     * Sets ites to updated items
     * @param {Array} items - Items
     */
    set setItems(_items) {
        this.items = _items
    }

    /**
     * Getter for array of sides
     * @return {Array} all sides
     */
    get getAllSides() {
        var sides = []
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getCategory === 0 || this.items[i].getCategory === 3) {
                sides.push(this.items[i])
            }
        }
        return sides
    }

    /**
     * Getter for entrees
     * @return {Array} all entrees
     */
    get getAllEntrees() {
        var entrees = []
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getCategory === 1 || this.items[i].getCategory === 4) {
                entrees.push(this.items[i])
            }
        }
        return entrees
    }

    /**
     * Getter for all drinks
     * @return {Array} all drinks
     */
    get getAllDrinks() {
        var drinks = []
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getCategory === 2 || this.items[i].getCategory === 5) {
                drinks.push(this.items[i])
            }
        }
        return drinks
    }

    /**
     * Method to add a new menu item
     * @param {String} _productName - Menu item name
     * @param {Number} _salePrice - Individual sale price
     * @param {Number} _category - menu item category
     * @param {Array} ingredients - Array of ingredients (InventoryItems)
     */
    async addToMenu(_productName, _salePrice, _category, ingredients) {
        const menuId = await findNextMenuId();
        var j = new MenuItem(menuId, _productName, _salePrice, _category, ingredients); 
        this.items.push(j)
        addMenuItem(j)
    }

    /**
     * Method to delete a menu item
     * @param {Number} _menuItemId - Menu item id
     */
    deleteFromMenu(_menuItemId) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getMenuItemId === _menuItemId) {
                deleteMenuItem(this.items[i])
                this.items.splice(i, 1); 
            }
        }
    }

    /**
     * Method that given a menuItem id, returns menu item object
     * @param {Number} _menuItemId - Menu Item Id
     * @return {MenuItem} a constructed local MenuItem
     */
    getMenuItemFromId(_menuItemId) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getMenuItemId === _menuItemId) {
                return this.items[i]
            } 
        }
     
    }

    /**
     * Method that given a menuItem name, returns menu item object
     * @param {String} itemName - Menu Item name
     * @return {MenuItem} a constructed local MenuItem
     */
    getMenuItemFromName(itemName) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getProductName === itemName) {
                return this.items[i]
            } 
        }
    }

    /**
     * Method that updates a menuitem price
     * @param {Number} itemId - Menu Item id
     * @param {Number} newPrice - new Price
     */
    updatePrice(itemId, newPrice) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getMenuItemId === itemId) {
                this.items[i].setSalePrice = newPrice
                changeMenuPrice(itemId, newPrice)
            } 
        }
    }
}

export { Menu, MenuItem,} 