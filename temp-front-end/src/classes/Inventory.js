/**
 * This class, InventoryItem, holds all the information each item in inventory holds
 * It also has constructor to create new inventory item and get and set functions to get the informations and modify information locally
 * 
 * @author Alicia Kim - 131003034 315 - Project 3
 *
 */

import { findNextInventoryId, addInventoryItem, deleteInventoryItem, updateInventoryItemPrice, updateInventoryItemQuantity, addInventoryOrder } from '../connections/inventoryFunctions'

class InventoryItem {
    private
        inventoryId = -1;
        inventoryName = ""
        itemType = -1
        unitPrice = -1
        quantity = 0;

    /**
     * InventoryItem constructor to make a new inventory item locally
     * 
     * @param _inventoryID the inventory item id
     * @param _inventoryName the inventory item name
     * @param _itemType the inventory item category
     * @param _unitPrice the inventory item unit price
     * @param _quantity the inventory item quantity
     * @return {InventoryItem} a constructed local InventoryItem
     */
    constructor(_inventoryID, _inventoryName, _itemType, _unitPrice, _quantity) {
        this.inventoryId = _inventoryID
        this.inventoryName = _inventoryName
        this.itemType = _itemType
        this.unitPrice = _unitPrice
        this.quantity = _quantity;
    }

    /**
     * This gets the inventory item id
     * 
     * @return {inventoryId} inventory item id
     */
    get getInventoryID() {
        return this.inventoryId
    }

    /**
     * This gets the inventory item name
     * 
     * @return {inventoryName} inventory item name
     */
    get getInventoryName() {
        return this.inventoryName
    }

    /**
     * This gets the inventory item type
     * 
     * @return {itemType} inventory item type
     */
    get getItemType() {
        return this.itemType
    }

    /**
     * This gets the inventory item unit purchase price
     * 
     * @return {unitPrice} inventory item unit purchase price
     */
    get getUnitPrice() {
        return this.unitPrice
    }

    /**
     * This gets the inventory item quantity
     * 
     * @return inventory item quantity
     */
    get getQuantity() {
        return this.quantity
    }

    /**
     * This sets the inventory item's unit purchase price to a specified unit purchase price
     * 
     * @param {Number} _unitPrice the new unit purchase price to be set
     */
    set setUnitPrice(_unitPrice) {
        this.unitPrice = _unitPrice
    }

    /**
     * This sets the inventory item's quantity to a specified quantity
     * 
     * @param {Number} _quantity the new quantity to be set
     */
    set setQuantity(_quantity) {
        this.quantity = _quantity
    }
}

/**
 * This class, Inventory, holds all the items that exists in inventory table in the database
 * It has get functions to be used to get all the items in inventory or all the name of the items in inventory
 * It also has various functions to modify the database and update information locally
 *
 */
class Inventory{
    private 
        items = []

    /**
     * This item constructor is referenced by DatabaseInterface
     * 
     * @param {Array} data JSON object returned from inventoryFunctions.js getInventory function
     * @return {inventory} a constructed local Inventory
     */
    constructor(data = []) {
        this.items = [];
        for(let i = 0; i < data.length; i++) {
            var j = new InventoryItem(data[i].inventory_id, data[i].inventory_name, data[i].item_type, data[i].unit_purchase_price, data[i].quantity); 
            this.items.push(j)
        }
    }
    
    /**
     * This gets the all items in inventory
     * 
     * @return {Array} list of items in inventory
     */
    get getItems() {
        return this.items
    }

    /**
     * This gets the all items' name in inventory
     * 
     * @return {Array} list of items' name in inventory
     */
    get getAllNames() {
        var names = []
        for(let i = 0; i < this.items.length; i++) {
            names.push(this.items[i].getInventoryName)
        }
        return names
    }

    /**
     * Checks if there is a inventory item name same to the given string exists in inventory
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be checked
     * @return {Boolean} true if same name doesn't exist, false if it exists
     */
    checkInventoryItem(_inventoryName){
        var count = 0;
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === _inventoryName) {
                count++;
            } 
        }
        if(count!==0){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Adds a new inventory item created with appropriate inventory id found by findNextInventoryId() to the database(table: inventory) and update local inventory items list
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be added
     * @param {String} _itemType a string of type of inventory item that needs to be added
     * @param {String} _unitPrice a string of unit purchase price of inventory item that needs to be added
     */
    async addInventoryItem(_inventoryName, _itemType, _unitPrice){
        const inventoryID = await findNextInventoryId()
        var j = new InventoryItem(inventoryID,_inventoryName,_itemType,_unitPrice, 0);
        this.items.push(j)
        addInventoryItem(_inventoryName, _itemType, _unitPrice, 0)
        
    }

    /**
     * Deletes an inventory item with name given in parameter in the database(table: inventory) and update local inventory items list
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be deleted
     */
    deleteFromInventory(_inventoryName){
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === _inventoryName) {
                deleteInventoryItem(_inventoryName)
                this.items.splice(i, 1); 
            }
        }
    }

    /**
     * Gets an inventory item using the name given in parameter
     * 
     * @param {String}_inventoryName a string of name of inventory item
     * @return {InventoryItem} inventory item
     */
    getInventoryItemFromName(itemName) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === itemName) {
                return this.items[i]
            } 
        }
    }

    /**
     * Gets an inventory item using the id given in parameter
     * 
     * @param {String} _inventoryName a number of id of inventory item
     * @return {InventoryItem} inventory item
     */
    getInventoryItemFromID(itemID) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryID === itemID) {
                return this.items[i]
            } 
        }
    }

    /**
     * Updates an inventory item's unit purchase price to price given in parameter in the database(table: inventory) and update local inventory items list
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be updated
     * @param {Number} _unitPrice a string of new unit purchase price the inventory item will have
     */
    updateInventoryPrice(_inventoryName, _unitPrice) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === _inventoryName) {
                this.items[i].setUnitPrice = _unitPrice
                updateInventoryItemPrice(_inventoryName, _unitPrice)
            } 
        }
    }

    /**
     * Updates an inventory item's quantity to new quantity(given in parameter) + originial quantity in the database(table: inventory, inventory_order) and update local inventory items list
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be updated
     * @param {Number} _ordered_quantity a string of additional quantity the inventory item will have
     */
    updateInventoryQuantity(_inventoryName, _ordered_quantity) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === _inventoryName) {
                var new_quantity = parseInt(_ordered_quantity) + this.items[i].quantity
                var ordered_price = this.items[i].getUnitPrice * _ordered_quantity
                this.items[i].setQuantity = new_quantity
                updateInventoryItemQuantity(_inventoryName, new_quantity);
                addInventoryOrder(this.items[i].getInventoryID,_ordered_quantity,ordered_price,new_quantity);
            } 
        }
    }

    /**
     * Decrease an inventory item's quantity by 1 in the database(table: inventory) and update local inventory items list
     * 
     * @param {String} _inventoryName a string of name of inventory item that needs to be updated
     */
    decrementInventoryQuantity(_inventoryName) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].getInventoryName === _inventoryName) {
                var new_quantity = this.items[i].quantity - 1
                this.items[i].setQuantity = new_quantity
                updateInventoryItemQuantity(_inventoryName, new_quantity);
            } 
        }
    }
}


export { InventoryItem, Inventory, }