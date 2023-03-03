import { getInventory } from '../connections/inventoryFunctions'
import { Inventory, InventoryItem } from '../classes/Inventory'
/*
HOW TO CALL AND CREATE THE Sales Report

  const [restockReport, setRestockReport] = useState(new restockReport())
  useEffect(() => {
    async function generateReport() {
        let report = new RestockReport()
        await report.RestockReport()
        setRestockReport(report)
    }
    generateReport();
  }, []);
*/

/**
 * This class, RestockReportItem, holds all the information each RestockReportItem can hold
 * It also has constructor to create new RestockReportItem item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class RestockReportItem {
    private
        itemName= "";
        currentInventory = -1;
        //amountSold = -1;
    /**
     * Constructor to create a RestockReportItem Object
     * @param {String} itemName - Side id
     * @param {Number} currentInventory - Array of entree ids
     * @return {RestockReportItem} a constructed local RestockReportItem
     */
    constructor(itemName, currentInventory) { //}, amountSold) {
        this.itemName = itemName;
        this.currentInventory = currentInventory;
        //this.amountSold = amountSold;
    }
    
    /**
     * Getter for itemName
     * @return {String} itemName
     */
    get getItemName() {
        return this.itemName
    }

    /**
     * Getter for currentInventory
     * @return {Number} currentInventory
     */
    get getCurrentInventory() {
        return this.currentInventory
    }
}

/**
 * This class, RestockReport, holds all the information each RestockReport can hold
 * It also has constructor to create new RestockReport item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class RestockReport {
    private
        restockReportItems = []
    /**
     * Constructor to create a RestockReport Object
     * @return {RestockReport} a constructed local RestockReport
     */
    constructor() {
        this.restockReportItems = [];
        //this.restockReport();
    }
    
    /**
     * Getter for restockReportItems
     * @return {Array} restockReportItems
     */
    get getRestockReportItems() {
        return this.restockReportItems
    }
    /**
     * Function to calculate the restock report
     */
    async restockReport() {
        //let data = 
        let data = await getInventory();
        let inventory = new Inventory(data);

    	for (let i = 0; i < inventory.getItems.length; i++) {
            let curr = inventory.getItems[i]


    		if (curr.getQuantity < 500) {
                let rrItem = new RestockReportItem(curr.getInventoryName, curr.getQuantity)
                this.restockReportItems.push(rrItem)
    		}
    		
    	}

    }
    
}

export { RestockReportItem, RestockReport } 