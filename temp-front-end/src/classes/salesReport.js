import { salesReport } from '../connections/ReportFunctions'

/*
HOW TO CALL AND CREATE THE Sales Report


  const [salesReport, setSalesReport] = useState(new SalesReport())
  useEffect(() => {
    async function generateReport() {
        let report = new SalesReport()
        await report.generateSalesReport(inventoryID, startTime, endTime)
        setSalesReport(report)
    }
    generateReport();
  }, []);

THE DATES MUST BE FORMATTED LIKE WHAT IS SHOWN, first param is inventory id
report.getSalesReportItems will be an array of all the orders of SalesReportItem objects

*/

/**
 * This class, SalesReportItem, holds all the information each SalesReportItem can hold
 * It also has constructor to create new SalesReportItem item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class SalesReportItem {
    private
        time= "";
        orderID = -1;
        money = -1;
    /**
     * Constructor to create a SalesReportItem Object
     * @param {String} time - Time stamo
     * @param {Number} orderID - Order if of sale
     * @param {Number} money - price
     * @return {SalesReportItem} a constructed local SalesReportItem
     */
    constructor(time, orderID, money) {
        this.time = time;
        this.orderID = orderID;
        this.money = money;
    }
    
    /**
     * Getter for time
     * @return {String} time
     */
    get getTime() {
        return this.time
    }

    /**
     * Getter for orderID
     * @return {Number} orderID
     */
    get getOrderId() {
        return this.orderID
    }

    /**
     * Getter for money
     * @return {Number} money
     */
    get getMoney() {
        return this.money
    }
}


/**
 * This class, SalesReport, holds all the information each SalesReport can hold
 * It also has constructor to create new SalesReport item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class SalesReport {
    private
        salesReportItems = []
    /**
     * Constructor to create a SalesReport Object
     * @return {SalesReport} a constructed local SalesReport
     */
    constructor() { 
        this.salesReportItems = [];
    }
    
    /**
     * Getter for salesReportItems
     * @return {Array} salesReportItems
     */
    get getSalesReportItems() {
        return this.salesReportItems
    }

    /**
     * Method to generate and update sales report item
     * @param {Number} inventoryID - Inventory ID
     * @param {String} startTime - start time
     * @param {String} endTime - End time
     */
    async generateSalesReport(inventoryID, startTime, endTime) {
        let data = await salesReport(inventoryID, startTime, endTime);
        //console.log("data: ", data);

        for(let i = 0; i < data.length; i ++) {
            let newOrder = new SalesReportItem(data[i].time_stamp, data[i].order_id, data[i].order_total);
            this.salesReportItems.push(newOrder)
            //console.log("added a item: ", newOrder)
        }
        //return this.salesReportItems;

    }
    
}

export { SalesReportItem, SalesReport } 