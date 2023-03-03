/**
 * This class, Meal, holds all the information each Meal an order can hold
 * It also has constructor to create new meal item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class Meal {
    private
        sideId = -1
        entrees = []
        mealTypeId = -1

    /**
     * Constructor to create a Meal Object
     * @param {Number} _sideId - Side id
     * @param {Array} _entrees - Array of entree ids
     * @param {Number} _mealTypeId - 1, 2, or 3 depending on its meal type
     * @return {Meal} a constructed local Meal
     */
    constructor(_sideId, _entrees, _mealTypeId) {
        this.sideId = _sideId
        this.entrees = _entrees
        this.mealTypeId = _mealTypeId
    }

    /**
     * Getter for sideId
     * @return {Number} side id
     */
    get getSideId() {
        return this.sideId;
    }

    /**
     * Getter for entrees
     * @return {Array} Array of entree ids
     */
    get getEntrees() {
        return this.entrees;
    }

    /**
     * Getter for Meal Type Id
     * @return {Number} mealtype id
     */
    get getMealTypeId() {
        return this.mealTypeId;
    }
}
export { Meal } 
