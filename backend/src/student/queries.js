/**
 * This file contains all the queries necessary get or edit the database
 * 
 * @author Alicia Kim - 131003034, Justin Van Nimwegen - 930005547
 *
 */
const getStudents = "SELECT * FROM employee";
const getStudentsById = "SELECT * FROM employee WHERE employee_id = $1";
const getSingleValue = "SELECT username FROM employee WHERE employee_id = $1";

const getNextIdValue = "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1";
const newOrder = "INSERT INTO orders(order_id, time_stamp, employee_id, order_total) VALUES($1, $2, $3, $4)"

const getNextMealIdValue = "SELECT meal_id FROM meal ORDER BY meal_id DESC LIMIT 1";
const newOrderMeals = "INSERT INTO order_meals_bridge(order_id, meal_id) VALUES($1, $2)"
const newMeal = "INSERT INTO meal(meal_id, meal_type_id, side_id) VALUES($1, $2, $3)"
const mealItem = "INSERT INTO meal_items_bridge(meal_id, menu_item_id) VALUES($1, $2)"

const orderAddOnItems = "INSERT INTO order_addon_items_bridge(order_id, addon_item_id) VALUES($1, $2)"


const getMenuItems = "SELECT * FROM menu_item ORDER BY menu_item_id"
const addMenuItem = "INSERT INTO menu_item VALUES($1, $2, $3, $4)"
const deleteMenuItem = "DELETE FROM menu_item where menu_item_id = $1"
const updateMenuItemPrice = "UPDATE menu_item SET sale_price = $1 WHERE menu_item_id = $2"
const getNextMenuIdValue = "SELECT menu_item_id FROM menu_item ORDER BY menu_item_id DESC LIMIT 1";

const addMenuItemIng = "INSERT INTO ingredient_bridge(menu_item_id, inventory_order_id) VALUES ($1, $2)"
const deleteMenuItemIngs = "DELETE FROM ingredient_bridge WHERE menu_item_id = $1"

const getMealTypes = "SELECT * FROM meal_price ORDER BY meal_type_id"
const updateMealTypePrice = "UPDATE meal_price SET meal_price = $1 WHERE meal_type_id = $2"

const getInventory = "SELECT * FROM inventory ORDER BY inventory_id; "
const getNextInventoryIdValue = "SELECT inventory_id FROM inventory ORDER BY inventory_id DESC LIMIT 1";
const getNextInventoryOrderIdValue = "SELECT inventory_order_id FROM inventory_order ORDER BY inventory_order_id DESC LIMIT 1";

const addInventoryItem = "INSERT INTO inventory(inventory_id, inventory_name, item_type, unit_purchase_price, quantity) VALUES($1, $2, $3, $4, $5)"
const deleteInventoryItem = "DELETE FROM inventory WHERE inventory_name = $1"
const updateInventoryItemPrice = "UPDATE inventory SET unit_purchase_price = $1 WHERE inventory_name = $2"
const updateInventoryItemQuantity = "UPDATE inventory SET quantity = $1 WHERE inventory_name = $2"
const addInventoryOrder = "INSERT INTO inventory_order(inventory_order_id, inventory_item_id, inventory_quantity, time_stamp, inventory_order_price, quantity_snapshot) VALUES($1, $2, $3, $4, $5, $6)"

const sellsTogether = "SELECT mib.meal_id, mib.menu_item_id " +  
                        "FROM ((orders o INNER JOIN order_meals_bridge omb ON o.order_id = omb.order_id) " +
                        "INNER JOIN meal_items_bridge mib ON omb.meal_id = mib.meal_ID) " +
                        "WHERE o.time_stamp > $1 AND o.time_stamp < $2";

const salesReport = "SELECT DISTINCT o.order_id, o.time_stamp, o.order_total " +
                        " FROM ORDERS o INNER JOIN order_addon_items_bridge oai ON o.order_id = oai.order_id " +
                        " INNER JOIN order_meals_bridge om ON o.order_id = om.order_id INNER JOIN meal_items_bridge mi ON om.meal_id = mi.meal_id " +
                        " WHERE (menu_item_id = $1 OR addon_item_id = $1) AND $2 <= time_stamp AND time_stamp <= $3 ORDER BY o.order_id"

// All Excess Report Queries
const getMinDate = "SELECT time_stamp FROM inventory_order ORDER BY time_stamp LIMIT 1"
const inventoryOrderSQLStr = "SELECT time_stamp, quantity_snapshot "
                                + "FROM inventory_order WHERE time_stamp <= $1 "
                                + "ORDER BY time_stamp DESC LIMIT 1"
const orderJoinSQLStr1 = "SELECT COUNT(addon_item_id) AS quantity "
                        + "FROM orders o INNER JOIN order_addon_items_bridge oai "
                        + "ON o.order_id = oai.order_id WHERE oai.addon_item_id = $1 "
                        + "AND $2 <= o.time_stamp AND o.time_stamp <= $3"   

const orderJoinSQLStr2 = "SELECT COUNT(*) AS quantity "
                        + "FROM (orders o INNER JOIN order_meals_bridge om "
                        + "ON o.order_id = om.order_id) INNER JOIN meal_items_bridge mi "
                        + "ON om.meal_id = mi.meal_id WHERE mi.menu_item_id = $1 "
                        + "AND $2 <= o.time_stamp AND o.time_stamp <= $3"

const restockAmountSQLStr = "SELECT SUM(inventory_quantity) FROM inventory_order WHERE $1 <= time_stamp AND time_stamp <= $2 AND inventory_item_id = $3"

//Employee Queries
const checkAndGetEmployeeInfo = "SELECT * FROM employee WHERE username = $1 AND password = $2"          

// Get order by ID
const getOrder = "SELECT * FROM orders where order_id = $1"

const getMealIds = "SELECT * FROM order_meals_bridge WHERE order_id = $1"

const getMeals = "SELECT * FROM meal where meal_id = $1"

const getMealItems = "SELECT * FROM meal_items_bridge WHERE meal_id = $1"

const getAddOnItems = "SELECT * FROM order_addon_items_bridge where order_id = $1"


const getMenuItemName = "SELECT * FROM menu_item WHERE menu_item_id = $1"

const getIngredientsByMenuId = "SELECT * FROM ingredient_bridge WHERE menu_item_id = $1"


module.exports = {
    getStudents,
    getStudentsById,
    getSingleValue,

    getNextIdValue,
    newOrder,

    getNextMealIdValue,
    newOrderMeals,
    newMeal,
    mealItem,

    orderAddOnItems,

    getMenuItems,
    addMenuItem,
    deleteMenuItem,
    updateMenuItemPrice,
    getNextMenuIdValue,

    getMealTypes,
    updateMealTypePrice,

    getInventory,
    getNextInventoryIdValue,
    getNextInventoryOrderIdValue,
    addInventoryItem,
    deleteInventoryItem,
    updateInventoryItemPrice,
    updateInventoryItemQuantity,
    addInventoryOrder,

    sellsTogether,
    salesReport,

    getMinDate,
    inventoryOrderSQLStr,
    orderJoinSQLStr1,
    orderJoinSQLStr2,
    restockAmountSQLStr,

    checkAndGetEmployeeInfo,

    getOrder,
    getMealIds,
    getMeals,
    getMealItems,
    getAddOnItems,
    
    getMenuItemName,

    addMenuItemIng,
    deleteMenuItemIngs,

    getIngredientsByMenuId,
}
