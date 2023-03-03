/**
* This file will contain a functions that will fetch appropriate routes to get data from the database or edit the database
* @author Justin Van Nimwegen - 930005547
*/

/**
  * Get all data from meal_price table in database ordered by meal_type_id and by fetching appropriate routes
  * @param {}
  * @return {json} - data from meal_price table in database ordered by meal_type_id
  */
async function getMealTypeInfo() {
    const response = await fetch('http://localhost:2000/api/v1/students/mealTypes')
    const data = await response.json()
    return data;
}

/**
  * Update a specific row in meal_price table in database using parameters given
  * Fetch appropriate routes with request whose body is built with given parameter
  * @param {number} mealTypeId - the id of meal item to be updated
  * @param {number} newPrice - the new price of specific meal item that needs to be updated
  * @return {}
  */
async function changeMealPrice(mealTypeId, newPrice) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({salePrice: newPrice, mealTypeId: mealTypeId})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/mealTypes/update', request)
    const data = await response.json()
}

export {
    getMealTypeInfo,
    changeMealPrice,
}