/**
* This file will contain a functions that will fetch appropriate routes to get data from the database or edit the database
* @author Justin Van Nimwegen - 930005547
*/
import { Order } from "../classes/Order"
import { Meal } from "../classes/Meal"

import { getInventory, updateInventoryItemQuantity } from './inventoryFunctions';
import { Inventory, InventoryItem } from '../classes/Inventory'
import moment from 'moment';


/**
  * Get a next available order_id in the orders table in databse by fetching appropriate routes and adding 1 to the response
  * @return {number} - next available order_id
  */
async function findNextOrderId() {     
    const response = await fetch('http://localhost:2000/api/v1/students/orderID')
    const data = await response.json()
    const nextVal = data[0].order_id + 1
    return nextVal
}

/**
  * Get a next available meal_id in the meal table in databse by fetching appropriate routes and adding 1 to the response
  * @return {number} - next available inventory_meal_idid
  */
async function findNextMealId() {    
    const response = await fetch('http://localhost:2000/api/v1/students/mealID')
    const data = await response.json()
    const nextVal = data[0].meal_id + 1
    return nextVal
}

/**
  * Given a meal, updates the various tables with its data
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {string} orderID - orderid that the meal is a part of
  * @param {meal} meal - meal to be added
  * @param {Inventory} inv - current state of inventory
  * @return {}
  */
async function sendMeal(orderID, meal, inv) {
    // order_meals_bridge table
    let mealID = await findNextMealId()
    const requestOMB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderId: orderID, mealId: mealID})
    }
    const responseOMD = await fetch('http://localhost:2000/api/v1/students/meal/orderMeals', requestOMB)
    const dataOMD = await responseOMD.json()
    // meal table
    const requestM = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mealId: mealID, mealTypeId: meal.getMealTypeId, sideId: meal.getSideId})
    }
    const responseM = await fetch('http://localhost:2000/api/v1/students/meal/meal', requestM)
    const dataM = await responseM.json()


    // meal_items_bridge
    for(var i = 0; i < meal.getEntrees.length; i++) {
        const requestMIB = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mealId: mealID, menuItemId: meal.getEntrees[i]})
        }
        const responseMIB = await fetch('http://localhost:2000/api/v1/students/meal/mealItem', requestMIB)
        const dataMIB = await responseMIB.json()


        // De-incrementing ingredients for every entree
        const requestIB = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({menu_item_id: meal.getEntrees[i]})
        }
        const responseIB = await fetch('http://localhost:2000/api/v1/students/menuItems/getIngredients', requestIB)
        const dataIB = await responseIB.json()

        for(let j = 0; j < dataIB.length; j++) {
            let item = inv.getInventoryItemFromID(dataIB[j].inventory_order_id);
            let quantity = item.getQuantity - 1
            item.setQuantity = quantity
            await updateInventoryItemQuantity(item.getInventoryName, quantity)
        }
    }

    //De-incrementing ingredienrs for the side

    const requestIB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({menu_item_id: meal.getSideId})
    }
    const responseIB = await fetch('http://localhost:2000/api/v1/students/menuItems/getIngredients', requestIB)
    const dataIB = await responseIB.json()

    for(let j = 0; j < dataIB.length; j++) {
        let item = inv.getInventoryItemFromID(dataIB[j].inventory_order_id);
        let quantity = item.getQuantity - 1
        item.setQuantity = quantity
        await updateInventoryItemQuantity(item.getInventoryName, quantity)
    }
}

/**
  * Given a order, updates the various tables with its data
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {Order} order - order to be added
  * @return {}
  */
async function sendOrder(order) {
    let data = await getInventory();
    let inv = new Inventory(data);

    const orderID = await findNextOrderId()
    const timestamp = moment().format('YYYY-MM-DD hh:mm:ss');

    const requestO = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderId: orderID, timeStamp: timestamp, employeeId: order.getEmployeeId, orderTotal: order.getOrderTotal})
    }
    const responseO = await fetch('http://localhost:2000/api/v1/students/order', requestO)
    const dataO = await responseO.json()


     // order_addOn_items
     for(var i = 0; i < order.getAddOnIds.length; i++) {
        const requestAO = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({orderId: orderID, addOnItemId: order.getAddOnIds[i]})
        }
        const responseAO = await fetch('http://localhost:2000/api/v1/students/addOn', requestAO)

        const dataAO = await responseAO.json()

        // Updating Inventory
        let item = inv.getInventoryItemFromID(order.getAddOnIds[i]);
        let quantity = item.getQuantity - 1
        item.setQuantity = quantity
        await updateInventoryItemQuantity(item.getInventoryName, quantity)

    }
    

    for(var j = 0; j < order.meals.length; j++) {
        await sendMeal(orderID, order.meals[j], inv)
    }

    // Sending Misc Items Updates

    // Getting current inventory

    for(let i = 0; i < order.getMiscItemIds.length; i++) {
        let item = inv.getInventoryItemFromName(order.getMiscItemIds[i]);
        let quantity = item.getQuantity - 1
        item.setQuantity = quantity
        await updateInventoryItemQuantity(order.getMiscItemIds[i], quantity)
    }
    return orderID;
}

// Get order information

/**
  * Called from getOrder, given a mealID constuct a meal object to return
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {Number} mealid - order to be added
  * @return {Meal} Constructed order object
  */
async function constructMeal(mealId) {
    //Getting Meal Information
    const requestM = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({meal_id: mealId})
    }
    const responseM = await fetch('http://localhost:2000/api/v1/students/order/getMeals', requestM)
    const mealInfo = await responseM.json()

    if(mealInfo.length == 0) {
        console.log("ERROR IN constructMeal")
        return null;
    }

    //Getting entrees

    const requestMIB = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({meal_id: mealId})
    }
    const responseMIB = await fetch('http://localhost:2000/api/v1/students/order/getMealItems', requestMIB)
    const mibInfo = await responseMIB.json()

    let entrees = []
    for(let i = 0; i < mibInfo.length; i++) {
        entrees.push(mibInfo[i].menu_item_id)
    }

    let meal = new Meal(mealInfo[0].side_id, entrees, mealInfo[0].meal_type_id)
    return meal

}

/**
  * Given an order id, constroct an order object to return
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {Number} orderid - order to be added
  * @return {Order} Constructed order object
  */
async function getOrder(orderID) {
    // HOW TO USE: 
    // IMPORTS: 
    // import { Order } from "../classes/Order"
    // import { getOrder } from "../connections/orderFunctions" 

    //Usestate/effect: 
    // const [orderName, setOrderName] = useState(new Order())
    //   useEffect(() => {
    //       async function getOrderData() {
    //           let data = await getOrder(10) 
    //           setOrderName(data);
    //       }
    //       getOrderData();
    //   }, []);
    //   console.log("order: ", orderName)

    // Main Order information
    
    const requestO = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({order_id: orderID})
    }
    const responseO = await fetch('http://localhost:2000/api/v1/students/order/getOrder', requestO)
    const orderInfo = await responseO.json()
    if (orderInfo.length === 0) {
        console.log("null: ", orderInfo)
        return null;
    } 

    // order_addOn_items

    const requestAO = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({order_id: orderID})
    }

    const responseAO = await fetch('http://localhost:2000/api/v1/students/order/getAddOnItems', requestAO)
    const dataAO = await responseAO.json()

    let orderAddOnIds = []
    for(var i = 0; i < dataAO.length; i++) {
        orderAddOnIds.push(dataAO[i].addon_item_id)
    }
    
    // Meals items

    const requestM = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({order_id: orderID})
    }
    const responseM = await fetch('http://localhost:2000/api/v1/students/order/getMealIds', requestM)
    const dataM = await responseM.json()

    let meals = []

    for(var j = 0; j < dataM.length; j++) {
        let meal = await constructMeal(dataM[j].meal_id)
        meals.push(meal)
    }

    let newOrder = new Order(meals, orderAddOnIds, orderInfo[0].order_total, orderInfo[0].employee_id);
    return newOrder;
}


export {
    findNextOrderId,
    findNextMealId,
    sendMeal,
    sendOrder,

    getOrder,
}