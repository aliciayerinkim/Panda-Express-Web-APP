/**
 * This file contains all necessary controller functions that are called by specific routes to get or edit the database
 * 
 * @author Alicia Kim - 131003034, Justin Van Nimwegen - 930005547
 *
 */
const { response } = require('express');
const pool = require('../../db');
const queries = require('./queries');

/**
 * Gets a request and run the according queries to get all data from employee table in database
 * 
 * @param req request
 * @param res response
 * @return {results.rows} all data from employee table in database
 */
const getStudents = (req,res) => {
    pool.query(queries.getStudents, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get an employee by their id from employee table in database
 * 
 * @param req request
 * @param res response
 * @return {results.rows} the data of employee that has specific id from employee table in database
 */
const getStudentsById = (req,res) => {
    const id = parseInt(req.params.employee_id);
    pool.query(queries.getStudentsById,[id],(error,results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get an employee's name by their id from employee table in database
 * 
 * @param req request
 * @param res response
 * @return {string} name data of employee that has specific id from employee table in database
 */
const getSingleValue = (req,res) => {
    const id = parseInt(req.params.employee_id);
    pool.query(queries.getSingleValue,[id],(error,results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the highest order_id from orders table in database
 * 
 * @param req request
 * @param res response
 * @return {number} highest order_id from orders table in database
 */
const getNextOrderId = (req,res) => {
    pool.query(queries.getNextIdValue, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in orders table in database
 * 
 * @param req request
 * @param res response
 */
const newOrder = (req, res, next) => {
    pool.query(queries.newOrder, [req.body.orderId,req.body.timeStamp,req.body.employeeId,req.body.orderTotal], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries to get the highest meal_id from meal table in database
 * 
 * @param req request
 * @param res response
 * @return {number} highest meal_id from meal table in database
 */
const getNextMealId = (req,res) => {
    pool.query(queries.getNextMealIdValue, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in order_meals_bridge table in database
 * 
 * @param req request
 * @param res response
 */
const newOrderMealsBridge = (req, res, next) => {
    const orderId = parseInt(req.body.orderId);
    const mealId = parseInt(req.body.mealId);

    pool.query(queries.newOrderMeals, [orderId, mealId], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in meal table in database
 * 
 * @param req request
 * @param res response
 */
const newMeal = (req, res, next) => {
    const mealId = parseInt(req.body.mealId);
    const mealTypeId = parseInt(req.body.mealTypeId);
    const sideId = parseInt(req.body.sideId);
    pool.query(queries.newMeal, [mealId,mealTypeId,sideId], (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in meal_items_bridge table in database
 * 
 * @param req request
 * @param res response
 */
const mealItemBridge = (req, res, next) => {
    const mealId = parseInt(req.body.mealId);
    const menuItemId = parseInt(req.body.menuItemId);
    pool.query(queries.mealItem, [mealId,menuItemId], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in order_addon_items_bridge table in database
 * 
 * @param req request
 * @param res response
 */
const orderAddOnItemBridge = (req, res, next) => {
    const orderId = parseInt(req.body.orderId);
    const addOnItemId = parseInt(req.body.addOnItemId);
    pool.query(queries.orderAddOnItems, [orderId,addOnItemId], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries to get all data from menu_item table in database ordered by menu_item_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} all data from menu_item table in database ordered by menu_item_id
 */
const getMenuItems = (req,res) => {
    pool.query(queries.getMenuItems, (error, results) =>{
      if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in menu_item table in database
 * 
 * @param req request
 * @param res response
 */
const addMenuItem = (req, res, next) => {
    const menuItemId = parseInt(req.body.menuItemId);
    const productName = req.body.productName
    const salePrice = parseFloat(req.body.salePrice);
    const category = parseInt(req.body.category);
    
    pool.query(queries.addMenuItem, [menuItemId,productName,salePrice,category], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};


/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in ingredient_bridge table in database
 * 
 * @param req request
 * @param res response
 */
const addMenuItemIng = (req,res) => {
    pool.query(queries.addMenuItemIng, [req.body.menu_item_id, req.body.ingredient], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to delete a row in ingredient_bridge table in database using menu_item_id
 * 
 * @param req request
 * @param res response
 */
const deleteMenuItemIng = (req,res) => {
    pool.query(queries.deleteMenuItemIngs, [req.body.menu_item_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


/**
 * Gets a request and run the according queries using neccessary data from request to delete a row in menu_item table in database using menu_item_id
 * 
 * @param req request
 * @param res response
 */
const deleteMenuItem = (req, res, next) => {
    const menuItemId = parseInt(req.body.menuItemId);

    pool.query(queries.deleteMenuItem, [menuItemId], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to update sale_price in menu_item table in database using menu_item_id
 * 
 * @param req request
 * @param res response
 */
const updateMenuItemPrice = (req, res, next) => {
    const salePrice = parseFloat(req.body.salePrice);
    const menuItem = parseInt(req.body.menuItem);

    pool.query(queries.updateMenuItemPrice, [salePrice, menuItem], (err, results) => {
      if (err) throw err;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the highest menu_item_id from menu_item table in database
 * 
 * @param req request
 * @param res response
 * @return {number} highest menu_item_id from menu_item table in database
 */
const getNextMenuId = (req,res) => {
    pool.query(queries.getNextMenuIdValue, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get all data from meal_price table in database ordered by meal_type_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} all data from meal_price table in database ordered by meal_type_id
 */
const getMealTypes = (req,res) => {
    pool.query(queries.getMealTypes, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to update meal_price in meal_price table in database using meal_type_id
 * 
 * @param req request
 * @param res response
 */
const updateMealTypePrice = (req, res, next) => {
    const salePrice = parseFloat(req.body.salePrice);
    const mealTypeId = parseInt(req.body.mealTypeId);

    pool.query(queries.updateMealTypePrice, [salePrice, mealTypeId], (err, results) => {
      if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries to get all data from inventory table in database ordered by inventory_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} all data from inventory table in database ordered by inventory_id
 */
const getInventory = (req,res) => {
    pool.query(queries.getInventory, (error, results) =>{

        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the highest inventory_id from inventory table in database
 * 
 * @param req request
 * @param res response
 * @return {number} highest inventory_id from inventory table in database
 */
const getNextInventoryId = (req,res) => {
    pool.query(queries.getNextInventoryIdValue, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the highest inventory_order_id from inventory_order table in database
 * 
 * @param req request
 * @param res response
 * @return {number} highest inventory_order_id from inventory_order table in database
 */
const getNextInventoryOrderId = (req,res) => {
    pool.query(queries.getNextInventoryOrderIdValue, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in inventory table in database
 * 
 * @param req request
 * @param res response
 */
const addInventoryItem = (req, res, next) => {

    pool.query(queries.addInventoryItem, [req.body.inventoryId, req.body.inventoryName, req.body.itemType, req.body.unitPrice, req.body.quantity], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to delete a row in inventory table in database using inventory_name
 * 
 * @param req request
 * @param res response
 */
const deleteInventoryItem = (req, res, next) => {

    pool.query(queries.deleteInventoryItem, [req.body.inventoryName], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to update unit_purchase_price in inventory table in database using inventory_name
 * 
 * @param req request
 * @param res response
 */
const updateInventoryItemPrice = (req, res, next) => {

    pool.query(queries.updateInventoryItemPrice, [req.body.unitPrice, req.body.inventoryName], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to update quantity in inventory table in database using inventory_name
 * 
 * @param req request
 * @param res response
 */
const updateInventoryItemQuantity = (req, res, next) => {
    pool.query(queries.updateInventoryItemQuantity, [req.body.quantity, req.body.inventoryName], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to add a new row in inventory_order table in database
 * 
 * @param req request
 * @param res response
 */
const addInventoryOrder = (req, res, next) => {
    pool.query(queries.addInventoryOrder, [req.body.inventoryOrderID, req.body.inventoryId, req.body.orderQuantity, req.body.timeStamp, req.body.orderPrice, req.body.afterQuantity], (err, results) => {
        if (err) return next(err);
        res.json(results.rows);
    });
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data for sells report
 * 
 * @param req request
 * @param res response
 */
const sellsTogether = (req,res) => {
    pool.query(queries.sellsTogether, [req.body.startTime, req.body.endTime], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data for sales report
 * 
 * @param req request
 * @param res response
 * @return {results.rows}
 */
const salesReport = (req,res) => {
    pool.query(queries.salesReport, [req.body.inventoryId, req.body.startTime,  req.body.endTime], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the lowest time_stamp from inventory_order table in database
 * 
 * @param req request
 * @param res response
 * @return {string} lowest time_stamp from inventory_order table in database
 */
const getMinDate = (req,res) => {
    pool.query(queries.getMinDate, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Helper Query for Excess Report
 * 
 * @param req request
 * @param res response
 * @return {data} quantity snapshot of data at given time
 */
const inventoryOrderSQLStr = (req,res) => {
    pool.query(queries.inventoryOrderSQLStr, [req.body.targetDate], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Helper Query for Excess Report
 * 
 * @param req request
 * @param res response
 * @return {data} For given item searches for when it was bought as an addon over a given time frame
 */
const orderJoinSQLStr1 = (req,res) => {
    pool.query(queries.orderJoinSQLStr1, [req.body.InventoryItemId, req.body.startDate, req.body.targetDate], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Helper Query for Excess Report
 * 
 * @param req request
 * @param res response
 * @return {data} For given item searches for when it was bought as an entree over a given time frame
 */
const orderJoinSQLStr2 = (req,res) => {
    pool.query(queries.orderJoinSQLStr2, [req.body.InventoryItemId, req.body.startDate, req.body.targetDate], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the sum of the data from inventory_order table in database using time_stamp and inventory_item_id
 * 
 * @param req request
 * @param res response
 * @return {string} lowest time_stamp from inventory_order table in database
 */
const restockAmountSQLStr = (req,res) => {
    pool.query(queries.restockAmountSQLStr, [req.body.begin, req.body.end, req.body.inventoryItemId], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries to get the data from employee table in database using username and password
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data of employee with specific username and password
 */
const checkAndGetEmployeeInfo = (req,res) => {
    pool.query(queries.checkAndGetEmployeeInfo, [req.body.username, req.body.password], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from orders table in database using order_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from orders table that contains order_id from req
 */
const getOrder = (req,res) => {
    pool.query(queries.getOrder, [req.body.order_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from order_meals_bridge table in database using order_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from order_meals_bridge table that contains order_id from req
 */
const getMealIds = (req,res) => {
    pool.query(queries.getMealIds, [req.body.order_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from meal table in database using meal_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from meal table that contains meal_id from req
 */
const getMeals = (req,res) => {
    pool.query(queries.getMeals, [req.body.meal_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from meal_items_bridge table in database using meal_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from meal_items_bridge table that contains meal_id from req
 */
const getMealItems = (req,res) => {
    pool.query(queries.getMealItems, [req.body.meal_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from order_addon_items_bridge table in database using order_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from order_addon_items_bridge table that contains order_id from req
 */
const getAddOnItems = (req,res) => {
    pool.query(queries.getAddOnItems, [req.body.order_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

/**
 * Gets a request and run the according queries using neccessary data from request to get data from menu_item table in database using menu_item_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from menu_item table that contains menu_item_id from req
 */
const getMenuItemName = (req,res) => {
    pool.query(queries.getMenuItemName, [req.body.menu_item_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


/**
 * Gets a request and run the according queries using neccessary data from request to get data from ingredient_bridge table in database using menu_item_id
 * 
 * @param req request
 * @param res response
 * @return {results.rows} data from ingredient_bridge table that contains menu_item_id from req
 */
const getIngredientsByMenuId = (req,res) => {
    pool.query(queries.getIngredientsByMenuId, [req.body.menu_item_id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getStudents,
    getStudentsById,
    getSingleValue,

    getNextOrderId,
    newOrder,

    getNextMealId,
    newOrderMealsBridge,
    newMeal,
    mealItemBridge,

    orderAddOnItemBridge,

    getMenuItems,
    addMenuItem,
    deleteMenuItem,
    updateMenuItemPrice,
    getNextMenuId,

    getMealTypes,
    updateMealTypePrice,
  
    getInventory,
    getNextInventoryId,
    getNextInventoryOrderId,
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
    deleteMenuItemIng,

    getIngredientsByMenuId,
};
