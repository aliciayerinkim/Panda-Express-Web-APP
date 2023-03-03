import React, { useState, useEffect } from "react";
import "../components/styles.scss";
import HomeNav from "../components/HomeNav";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkEmployee } from '../connections/employeeFunctions'
import { Employee} from "../classes/EmployeeInfo"
/**
 * Allows an employee to log in.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @param {Setter} setIsManager - The setter function for the current manager status.
 * @author Joseph Quismorio
 */
function EmployeeLogin({setUser, setIsLoggedIn, setIsManager}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = () => {
    async function getEmployee() {
      // console.log(username);
      // console.log(password);
      let data = await checkEmployee(username, password); 
      //console.log(data[0]);
      let employeeData = new Employee(data);
      //console.log(employeeData);
      if (employeeData.isValid) {
        setUser(employeeData);
        setIsLoggedIn(true);
        if (employeeData.isManager){
          setIsManager(true);
        }
        navigate('/dashboard', { replace: true });
      }else{
        alert('Invalid');
      }
    }
    getEmployee();
  }; 

  return (
    <div className="login">
      <HomeNav />
      <div className="auth-form-container body" style={{paddingTop: '200px'}}>
        <Card style={{ width: '42vw', boxShadow: "rgb(0 0 0 / 30%) 1px 1px 10px", transition: "all 100s ease-in-out"}}>
          <div className="auth-form-content">
              <h3 className="auth-form-title mt-3">EMPLOYEE SIGN IN</h3>
              <h5 className="mb-3">Username</h5>
              <input size="lg" class="form-control mb-3" onChange={handleChangeUsername} value={username} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required></input>

              <h5 className="mb-3">Password</h5>
              <input type="password" size="lg" class="form-control" onChange={handleChangePassword} value={password} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required></input>
              <Button variant="panda-btn" size="md" className="d-grid gap-2 mt-4 mb-4 btn-block" type="submit" style={{ fontWeight: 800 }} onClick={onSubmitHandler}>
                SUBMIT
              </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeLogin;