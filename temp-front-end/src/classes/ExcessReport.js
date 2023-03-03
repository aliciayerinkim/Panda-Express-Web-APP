import { getMinDate, inventoryOrderSQLStr, orderJoinSQLStr1, orderJoinSQLStr2, restockAmountSQLStr } from '../connections/ReportFunctions'
import { getInventory } from '../connections/inventoryFunctions'

/*
HOW TO CALL AND CREATE THE EXCESS REPORT:
  const [excessReport, setExcessReport] = useState(new ExcessReport())
  useEffect(() => {
    async function generateER() {
        let report = new ExcessReport()
        async report.excessReport(startTime, endTime)
        setExcessReport(report)
    }
    generateER();
  }, []);
*/

/**
 * This class, ExcessReportItem, holds all the information each ExcessReportItem can hold
 * It also has constructor to create new ExcessReportItem item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class ExcessReportItem {
    private
        itemName = "";
        percentage = 0.0;
    /**
     * Constructor to create a ExcessReportItem Object
     * @param {String} itemName - Item name
     * @param {Number} percentage - percentage product bought
     * @return {ExcessReportItem} a constructed local ExcessReportItem
     */
    constructor(itemName, percentage) {
        this.itemName = itemName;
        this.percentage = percentage;
    }

    /**
     * Getter for itemName
     * @return {String} itemName
     */
    get getItemName() {
        return this.itemName
    }

    /**
     * Getter for percentage
     * @return {Number} percentage
     */
    get getPercentage() {
        return this.percentage
    }

}

/**
 * This class, ExcessReport, holds all the information each ExcessReport can hold
 * It also has constructor to create new ExcessReport item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class ExcessReport {
    private
        itemsMap = [];
    /**
     * Constructor to create a ExcessReport Object
     * @return {ExcessReport} a constructed local ExcessReport
     */
    constructor() { //startTime, endTime) {
        this.itemsMap = [];
        //this.excessReport(startTime, endTime);
    }

    /**
     * Getter for itemsMap
     * @return {Array} itemsMap
     */
    get getItems() {
        return this.itemsMap
    }  

    /**
     * Method to get the quantity of an inventory item at a given time
     * @param {Number} inventoryItemId - Item name
     * @param {String} trargetDate - time
     * @return {Number} quantity of an inventory item at a given time
     */
    async getInventoryQuantityAtTime(inventoryItemId, trargetDate) {
        let getMinDateData = await getMinDate();
        let miniDate = (getMinDateData[0].time_stamp).substring(0,10)

        // if targetdate is before the first date of the interval
        if (getMinDateData[0].time_stamp.localeCompare(trargetDate)  > 0) {
            trargetDate = miniDate
        }

        let startDate = "2022-09-04"
        let startQuantity = 0
        let inventoryOrderSQLStrData = await inventoryOrderSQLStr(trargetDate)
        // console.log("z: ", inventoryOrderSQLStrData)
        if (inventoryOrderSQLStrData.length > 0) {
            startQuantity = inventoryOrderSQLStrData[0].quantity_snapshot
            startDate = (inventoryOrderSQLStrData[0].time_stamp).substring(0,10)
        }

        let orderQuantity_Order_and_Order_addon_BRIDGE = -1
        let orderJoinSQLStr1Data = await orderJoinSQLStr1(inventoryItemId, startDate, trargetDate)
        orderQuantity_Order_and_Order_addon_BRIDGE = orderJoinSQLStr1Data[0].quantity
        //console.log("z1: ", orderQuantity_Order_and_Order_addon_BRIDGE)

        let orderQuantity_Order_and_Meal_and_Meal_items_BRIDGE = -1
        let orderJoinSQLStr2Data = await orderJoinSQLStr2(inventoryItemId, startDate, trargetDate)
        orderQuantity_Order_and_Meal_and_Meal_items_BRIDGE = orderJoinSQLStr2Data[0].quantity
        //console.log("z2: ", orderQuantity_Order_and_Meal_and_Meal_items_BRIDGE)
        //console.log("start: ", startQuantity)
        //console.log("return: ", startQuantity - orderQuantity_Order_and_Order_addon_BRIDGE - orderQuantity_Order_and_Meal_and_Meal_items_BRIDGE)
        return startQuantity - orderQuantity_Order_and_Order_addon_BRIDGE - orderQuantity_Order_and_Meal_and_Meal_items_BRIDGE;

    }

    /**
     * Method to get the restock amount over a time period
     * @param {Number} inventoryItemId - Item id
     * @param {String} begin - time
     * @param {String} end - time
     * @return {Number} restock amount over given time
     */
    async getRestockAmount(inventoryItemId, begin, end) {
        let restockAmountSQLStrData = await restockAmountSQLStr(inventoryItemId, begin, end);
        let restockAmount = restockAmountSQLStrData[0].sum
        //console.log("restock amount", restockAmount)
        return restockAmount
    }

    /**
     * Method to get the amount sold over a time period
     * @param {Number} inventoryItemId - Item id
     * @param {String} begin - time
     * @param {String} end - time
     * @return {Number} amount sold over given time
     */
    async getAmountSold(inventoryItemId, begin, end) {
        let quantityBefore = await this.getInventoryQuantityAtTime(inventoryItemId, begin);
        let quantityAfter = await this.getInventoryQuantityAtTime(inventoryItemId, end);
        let restockAmount = await this.getRestockAmount(inventoryItemId, begin, end);
        //console.log("quan before: ", quantityBefore, " quan after: ", quantityAfter, " restock amount: ", restockAmount)
        let numSales = quantityBefore - (quantityAfter + restockAmount);
        return numSales;
    }   

    /**
     * Method generate and update the excess report (itemsMap)
     * @param {String} startTime - time
     * @param {String} endTime - time
     */
    async excessReport(startTime, endTime) {
        //console.log("A")
        let inventoryData = await getInventory();
        //console.log("B: ", inventoryData)
        let ingredientIdName = new Map();
        for(let i = 0; i < inventoryData.length; i++) {
            ingredientIdName.set(inventoryData[i].inventory_id, inventoryData[i].inventory_name)
        }

        //console.log("C: ", ingredientIdName)
        ingredientIdName.forEach (async function(value, key){
            //console.log("C1")
            let startInventory = await this.getInventoryQuantityAtTime(key, startTime);
            //console.log("C2: ", startInventory)
            let amtSold = await this.getAmountSold(key, startTime, endTime); 
           // console.log("C3: ", amtSold)
            let percentSold = amtSold/startInventory; 
            //console.log("C4: ", percentSold)
            if (percentSold <= .10) {
                //console.log("NEW ELE")
                let newEPI = new ExcessReportItem(value, percentSold)
                this.itemsMap.push(newEPI);
            }
        }.bind(this));
    }    
}

export { ExcessReport, ExcessReportItem } 
