/**
 * This file contains all the routes that will call the queries necessary get or edit the database
 * 
 * @author Alicia Kim - 131003034, Justin Van Nimwegen - 930005547
 *
 */
const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getStudents);
router.get("/employee/:employee_id", controller.getStudentsById);
router.get("/employee/:employee_id/uname", controller.getSingleValue);

router.get("/orderID", controller.getNextOrderId);
router.post("/order", controller.newOrder);

router.get("/mealID", controller.getNextMealId);
router.post("/meal/orderMeals", controller.newOrderMealsBridge);
router.post("/meal/meal", controller.newMeal);
router.post("/meal/mealItem", controller.mealItemBridge);

router.post("/addOn", controller.orderAddOnItemBridge);

router.get("/menuItems", controller.getMenuItems);
router.get("/menuItems/menuId", controller.getNextMenuId);
router.post("/menuItems/add", controller.addMenuItem);
router.post("/menuItems/add/ing", controller.addMenuItemIng);
router.post("/menuItems/delete", controller.deleteMenuItem);
router.post("/menuItems/delete/ing", controller.deleteMenuItemIng);
router.post("/menuItems/update", controller.updateMenuItemPrice);

router.get("/mealTypes", controller.getMealTypes);
router.post("/mealTypes/update", controller.updateMealTypePrice);

router.get("/inventory",controller.getInventory);
router.get("/inventoryID",controller.getNextInventoryId);
router.get("/inventoryOrderID",controller.getNextInventoryOrderId);
router.post("/inventory/add",controller.addInventoryItem);
router.post("/inventory/delete",controller.deleteInventoryItem);
router.post("/inventory/updateprice",controller.updateInventoryItemPrice);
router.post("/inventory/updatequantity",controller.updateInventoryItemQuantity);
router.post("/inventoryorder/add",controller.addInventoryOrder);

router.post("/reports/sellstogether", controller.sellsTogether);
router.post("/reports/salesReport", controller.salesReport);

router.get("/reports/excess/getMinDate", controller.getMinDate);
router.post("/reports/excess/inventoryOrderSQLStr", controller.inventoryOrderSQLStr);
router.post("/reports/excess/orderJoinSQLStr1", controller.orderJoinSQLStr1);
router.post("/reports/excess/orderJoinSQLStr2", controller.orderJoinSQLStr2);
router.post("/reports/excess/restockAmountSQLStr", controller.restockAmountSQLStr);

router.post("/checkEmployee", controller.checkAndGetEmployeeInfo);

router.post("/order/getOrder", controller.getOrder);
router.post("/order/getMealIds", controller.getMealIds);
router.post("/order/getMeals", controller.getMeals);
router.post("/order/getMealItems", controller.getMealItems);
router.post("/order/getAddOnItems", controller.getAddOnItems);

router.post("/menuItems/getMenuItemName", controller.getMenuItemName);

router.post("/menuItems/getIngredients", controller.getIngredientsByMenuId);

module.exports = router;