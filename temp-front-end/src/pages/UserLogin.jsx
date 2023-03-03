import React, { useState, useEffect } from "react";
import "../components/styles.scss";
import HomeNav from "../components/HomeNav";
import jwt_decode from "jwt-decode";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Allows a customer to log in using Google OAuth.
 * @param {Object} user - The current user.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @author Joseph Quismorio
 */
function UserLogin({ user, setUser, setIsLoggedIn }) {
  let [authMode, setAuthMode] = useState("signin")

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    setIsLoggedIn(true);
  }

  function handleSignout(event) {
    setUser({});
    setIsLoggedIn(false);
  }

  useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
          client_id: "872426610376-8n6s963sqst5hvdm59tea156t78e5frm.apps.googleusercontent.com",
          callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: 'outline', size: 'large'}
      )
  });

  if (authMode === "signin") {
    return (
      <div className="auth-form-container" style={{paddingTop: '200px'}}>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <HomeNav />
        <Form className="auth-form">
          <div className="auth-form-content">
            <div className="text-center mb-4">
              {
                Object.keys(user).length !== 0 ? 
                <div>
                  <h3 className="auth-form-title" style={{textTransform: 'uppercase'}}>WELCOME!</h3>
                  <Row className="mb-2">
                    <Col>
                      <img src={user.picture} style={{borderRadius: '50%'}}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h5 style={{fontWeight: '600'}}>{user.name}</h5>
                      <h6>{user.email}</h6>                            
                    </Col>
                  </Row>
                  <Row className="d-block">
                    <Col>
                      <Button variant='panda-btn' className='mt-3' style={{fontWeight: '600'}} onClick={() => navigate('/order')}>CREATE ORDER</Button>
                    </Col>
                    {localStorage.getItem('orderInProgress') === '[]' ? 
                    <div></div>
                    : 
                    <Col>
                      <Button variant='panda-btn' className='mt-3' style={{fontWeight: '600'}} onClick={() => navigate('/order/order-confirmation')}>CURRENT ORDER</Button>
                    </Col>}
                    <Col>
                      <Button variant='panda-btn' className='mt-3' style={{fontWeight: '600'}} onClick={(event) => handleSignout(event)}>SIGN OUT</Button>       
                    </Col>
                  </Row>
                </div> : 
                <div>
                  <h3 className="auth-form-title">SIGN IN</h3>
                  <div id='signInDiv'></div> 
                  <p className="text-center mt-2" style={{fontSize: '12px'}}>
                    Employees, log in <a href="/login-employee">here</a>
                  </p>
                </div>
              }
            </div>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <div className="auth-form-container" style={{paddingTop: '200px'}}>
      <HomeNav />
      <Form className="auth-form" onSubmit={onSubmitHandler}>
        <div className="auth-form-content">
          <h3 className="auth-form-title">SIGN UP</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="panda-btn" size="md" className="d-grid gap-2 mt-4 mb-3 btn-block" type="submit" style={{ fontWeight: 800 }}>
             SIGN IN
            </Button>
            <div id="signInDiv"></div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default UserLogin;