/**
* This file will contain a functions that will fetch appropriate routes to get data from the database or edit the database
* @author Justin Van Nimwegen - 930005547
*/

/**
  * Get the data from employee table in database using username and password and by fetching appropriate routes
  * @param {}
  * @return {json} - data of employee with specific username and password
  */
async function checkEmployee(username, password) {
    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    }
    const response = await fetch('http://localhost:2000/api/v1/students/checkEmployee', request)
    const data = await response.json()
    return data;
}

export {
    checkEmployee
}