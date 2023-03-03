import { checkEmployee } from '../connections/employeeFunctions'

/*
HOW TO CALL AND USE THE EMPLOYEE PROPERTIES
   IMPORT AT THE TOP:
   import { checkEmployee } from '../connections/employeeFunctions'
   import { Employee} from "../classes/EmployeeInfo"
   // SUB IN USER INPUT FOR USERNAME AND PASSWORD

  const [employeeData, setEmployee] = useState(new Employee())
    useEffect(() => {
        async function getEmployee() {
        let data = await checkEmployee("jvannimwegen", 1234); 
        let employeeData = new Employee(data);
        setEmployee(employeeData);
        }
        getEmployee();
    }, []);
    console.log("employee: ", employeeData)

*/

/**
 * This class, Employee, holds all the information each Employee can hold
 * It also has constructor to create new Employee item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class Employee {
    private
        isValid = false
        employeeId = -1
        resturantId = -1
        employeeName = ""
        username = ""
        password = ""
        isManager = false
    /**
     * Constructor to create a Employee Object
     * @param {Array} data - JSON array of employee information
     * @return {Employee} a constructed local Employee
     */
    constructor(data = []) {
        if (data.length === 0) {
        }else {
            this.isValid = true
            this.employeeId = data[0].employee_id
            this.resturantId = data[0].restaurant_id
            this.employeeName = data[0].employee_name
            this.username = data[0].username
            this.password = data[0].password
            this.isManager = data[0].is_manager
        }
    }

    /**
     * Getter for isValid
     * @return {Boolean} isValid
     */
    get getIsValid() {
        return this.isValid
    }
    
    /**
     * Getter for employeeId
     * @return {Number} employeeId
     */
    get getEmployeeId() {
        return this.employeeId
    }  

    /**
     * Getter for resturantId
     * @return {Number} resturantId
     */
    get getResturantId() {
        return this.resturantId
    }  

    /**
     * Getter for employeeName
     * @return {String} employeeName
     */
    get getEmployeeName() {
        return this.employeeName
    }  

    /**
     * Getter for username
     * @return {String} username
     */
    get getUsername() {
        return this.username
    }  

    /**
     * Getter for password
     * @return {String} password
     */
    get getPassword() {
        return this.password
    } 

    /**
     * Getter for isManager
     * @return {Boolean} isManager
     */
    get getIsManager() {
        return this.isManager
    } 

   
}

export { Employee } 
