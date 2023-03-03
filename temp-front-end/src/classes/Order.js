/**
 * This class, Order, holds all the information each Order can hold
 * It also has constructor to create new Order item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class Order {
    private
        meals = []
        addOnIds = []                
        orderTotal = 0.0
        employeeId = 1
        miscItemIds = []// populate miscItemIds

    /**
     * Constructor to create a Order Object
     * @param {Array} _meals - Array of Meal Object
     * @param {Array} _addOnIds - Array of addOn ids
     * @param {Number} _orderTotal - Order total price
     * @param {Number} _employeeId - ID of employee
     * @return {Order} a constructed local Order
     */
    constructor(_meals = [], _addOnIds = [], _orderTotal = 0.0, _employeeId = 1) {
        this.meals = _meals
        this.addOnIds = _addOnIds
        this.orderTotal = _orderTotal
        //this.orderId = findNextOrder();
        this.employeeId = _employeeId
        this.addMiscItems() // populate miscItemIds
    }


    /**
     * Getter for meals
     * @return {Array} meals
     */
    get getMeals() {
        return this.meals;
    }

    /**
     * Getter for addOnIds
     * @return {Array} addOnIds
     */
    get getAddOnIds() {
        return this.addOnIds;
    }

    /**
     * Getter for orderTotal
     * @return {Number} orderTotal
     */
    get getOrderTotal() {
        return this.orderTotal;
    }

    /**
     * Getter for employeeId
     * @return {Number} employeeId
     */
    get getEmployeeId() {
        return this.employeeId;
    }

    /**
     * Getter for miscItemIds
     * @return {Array} miscItemIds
     */
    get getMiscItemIds() {
        return this.miscItemIds;
    }

    /**
     * Constructor to calculate all misc item for an order
     */
    addMiscItems() {
        for (let i = 0; i < this.meals.length; i++) {
            if(this.meals[i].getMealTypeId == 3) {
                this.miscItemIds.push("Bowls")
            }else if (this.meals[i].getMealTypeId == 2 || this.meals[i].getMealTypeId == 1) { // plate --> boxes, misc_item_id = 2, bigger plate --> boxes, misc_item_id = 2
                this.miscItemIds.push("Boxes")
            }

            this.miscItemIds.push("Silverware")
            this.miscItemIds.push("Napkins")

        }

        for (let i = 0; i < this.addOnIds.length; i++) {
            if (this.addOnIds[i] == 19) {
                this.miscItemIds.push("Cups")
            }else if (1 <= i && i <= 18) {
                this.miscItemIds.push("Bowl")
            }
        }

        if (this.meals.length/3 == 0) { // if less than 3 meals, add single bag
            this.miscItemIds.push("Bags")
        }else { // otherwise, add a bag for every three meals
            for (let i = 0; i < this.meals.length/3; i++) {
                this.miscItemIds.push("Bags")
            }
        }
    }

}
export { Order } 