import { changeMealPrice } from '../connections/mealTypeFunctions'
/**
 * This class, MealType, holds all the information each MealType can hold
 * It also has constructor to create new MealType item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class MealType {
    private
        id = -1;
        name = "";
        price = -1.0;
    /**
     * Constructor to create a Meal Object
     * @param {Number} _id - type id
     * @param {String} _name - name of type
     * @param {Number} _price - type price
     * @return {MealType} a constructed local MealType
     */
    constructor(_id, _name, _price) {
        this.id = _id
        this.name = _name
        this.price = _price
    }
    
    /**
     * Getter for id
     * @return {Number} id
     */
    get getId() {
        return this.id
    }

    /**
     * Getter for name
     * @return {String} name
     */
    get getName() {
        return this.name
    }

    /**
     * Getter for price
     * @return {Number} price
     */
    get getPrice() {
        return this.price
    }

    /**
     * Sets price to new price
     * @param {Number} newPrice - New Price
     */
    set setPrice(newPrice) {
        this.price = newPrice
    }
}
/**
 * This class, MealPrice, holds all the information each MealPrice can hold
 * It also has constructor to create new MealPrice item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class MealPrice {
    private
        mealTypes = []

    /**
     * Constructor to create a MealPrice Object
     * @param {Array} data - Array of JSON object loaded from backend
     * @return {MealPrice} a constructed local Meal
     */
    constructor(data = []) {
        this.mealTypes = [];
        for(let i = 0; i < data.length; i++) {
            var j = new MealType(data[i].meal_type_id, data[i].meal_name, data[i].meal_price); 
            this.mealTypes.push(j)
        }
    }
    
    /**
     * Getter for Meal Types
     * @return {Array} MealTypes
     */
    get getMealTypes() {
        return this.mealTypes
    }

    /**
     * Method to update a mealPrice
     * @param {Number} typeId - Meal Type ID
     * @param {Number} newPrice - New Price for Meal Type
     */
    updatePrice(typeId, newPrice) {
        for(let i = 0; i < this.mealTypes.length; i++) {
            if(this.mealTypes[i].getId === typeId) {
                this.mealTypes[i].setPrice = newPrice
                changeMealPrice(typeId, newPrice)
            } 
        }
    }


}

export { MealType, MealPrice } 