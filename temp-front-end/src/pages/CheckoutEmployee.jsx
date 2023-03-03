//import React from 'react';
import React, {useState, useEffect} from 'react';
import '../components/styles.scss';
import { useNavigate } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import EmployeeNav from '../components/EmployeeNav';
import { Col, Row, Button, Card, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Order } from '../classes/Order';
import { sendOrder} from "../connections/orderFunctions";
import { Meal } from '../classes/Meal'
import Maps from '../components/Maps'

/**
 * Allows an employee to check out an order.
 * @param {Array} cart - The current cart.
 * @param {Setter} setCart - The setter function for the current cart.
 * @author Joseph Quismorio
 */
function CheckoutEmployee({ cart, setCart }){
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1200;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  let preTaxPrice = 0;

  for (let i = 0; i < cart.length; i++){
    preTaxPrice += cart[i].price;
  }

  let tax = preTaxPrice * 0.0825;
  let totalPrice = preTaxPrice + tax;

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const navigate = useNavigate();

  /**
 * Creates an order from the current contents
 * of the cart, and sends it to the database.
 */
  const orderSend = () => {
    let meals = [];
    let addOns = [];

    for (let i = 0; i < cart.length; i++){
      if(cart[i].itemId === 0){
        let j = cart[i].noItems;
        for(let k = 0; k < j; k++){
          let meal = new Meal(cart[i].sideId, cart[i].entreesId, cart[i].mealId);
          meals.push(meal);
        }
      }else if(cart[i].itemId > 0){
        let j = cart[i].noItems;
        for(let k = 0; k < j; k++){
          addOns.push(cart[i].itemId);
        }
      }

    }
    let currOrder = new Order(meals, addOns, totalPrice.toFixed(2), 1);
    console.log(currOrder);
    sendOrder(currOrder);
    setCart([]);
    alert("Order Successful");
    navigate("/dashboard/");
  };

  return (
    width > breakpoint ?
      (<div>
        {window.location.pathname === '/dashboard/checkout' ? <EmployeeNav/> : <HomeNav />}
          <Container className="container" style={{marginTop: '18vh', marginBottom: '6vh'}}>
            <Row className="justify-content-between">
              <Col>
                <Button variant="panda-btn" size="md" className="bg-red text-white mb-4" href='/dashboard/' style={{fontWeight: 800}}>ADD MORE ITEMS</Button>
                <h3 className="mb-4" style={{fontWeight: 600}}>YOUR ORDER</h3>
                {(cart.length === 0)? <h6>Add some items to your order.</h6> :
                  cart.map((item) => (
                    <Card key={item.name} style={{ width: '42vw', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="card mr-4 mb-4">
                      <Row className="p-4">
                          <Col>
                            <h6 style={{fontWeight: '600'}}>{item.name} x{item.noItems}</h6>
                            <p style={{ fontSize: '12px', fontWeight: '400'}}>{item.entrees.length === 0 ? `${item.addOnItem}` : `${item.side}, ${item.entrees}`}</p>
                            <p style={{ fontSize: '16px', fontWeight: '600'}}>${item.price.toFixed(2)}</p>
                          </Col>
                          <Col className="text-right my-auto">
                          <Button variant="panda-btn" size="sm" className="bg-red text-white mb-2" id="bowl" onClick={() => removeFromCart(item)} style={{fontWeight: 800}}>REMOVE ITEM</Button>
                          </Col>
                      </Row>
                    </Card>
                  ))
                }
              </Col>
              <Col>
                <Card style={{boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}}>
                  <Card.Header style={{ height: '3rem'}}>
                      <Card.Title className="mt-1 text-center" style={{ fontWeight: '800'}}>CHECKOUT</Card.Title>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h6>Subtotal</h6>
                        <h6>${preTaxPrice.toFixed(2)}</h6>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h6>Estimated Tax</h6>
                        <h6>${tax.toFixed(2)}</h6>
                      </div>
                    </Row>
                    <hr
                    className='my-2'
                      style={{
                        backgroundColor: '#CCCBCB'
                      }}
                    />
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h5 style={{ fontWeight: '800'}}>Total</h5>
                        <h5 style={{ fontWeight: '800'}}>${totalPrice.toFixed(2)}</h5>
                      </div>
                    </Row>
                    <Row >
                        <h5 style={{paddingTop:20, fontWeight: '800'}}>Select Form of Payment</h5>
                        <Col  className="col ">
                          <div className="col ">
                            <Card key="cashOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/cashLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with Cash</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                        <Col  className="col ">
                          <div className="col ">
                            <Card key="cardOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/cardLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with Card</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                        <Col >
                          <div className="col">
                            <Card key="diningdollarsOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/schoolMoneyLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with dining dollars</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                  </Card.Body>
                  <Card.Footer style={{height: '5rem'}}>
                    <Button disabled={totalPrice === 0} variant="panda-btn" size="lg" className="my-2 bg-red btn-block text-white" id="bowl" onClick={() => orderSend()} style={{fontWeight: 800}}>ORDER NOW</Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
      </div>) : 
      (<div>
        {window.location.pathname === '/dashboard/checkout' ? <EmployeeNav/> : <HomeNav />}
          <Container className="container" style={{marginTop: '18vh', marginBottom: '6vh'}}>
              <Col>
                <Button variant="panda-btn" size="md" className="bg-red text-white mb-4" href='/dashboard/' style={{fontWeight: 800}}>ADD MORE ITEMS</Button>
                <h3 className="mb-4" style={{fontWeight: 600}}>YOUR ORDER</h3>
                {(cart.length === 0)? <h6>Add some items to your order.</h6> :
                  cart.map((item) => (
                    <Card key={item.name} style={{boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="card mb-4">
                      <Row className="p-4">
                        <Col>
                            <img src={require(`../images/${item.name}.png`)} alt="" className="img-fluid"/>
                          </Col>
                          <Col>
                            <h6 style={{fontWeight: '600'}}>{item.name} x{item.noItems}</h6>
                            <p style={{ fontSize: '12px', fontWeight: '400'}}>{item.entrees.length === 0 ? `${item.addOnItem}` : `${item.side}, ${item.entrees}`}</p>
                            <p style={{ fontSize: '16px', fontWeight: '600'}}>${item.price.toFixed(2)}</p>
                          </Col>
                          <Col className="text-right">
                          <Button variant="panda-btn" size="sm" className="bg-red text-white" id="bowl" onClick={() => removeFromCart(item)} style={{fontWeight: 800}}>REMOVE ITEM</Button>
                          </Col>
                      </Row>
                    </Card>
                  ))
                }
              </Col>
              <Col>
                <Card style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}}>
                  <Card.Header style={{ height: '3rem'}}>
                      <Card.Title className="mt-1 text-center" style={{ fontWeight: '800'}}>CHECKOUT</Card.Title>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h6>Subtotal</h6>
                        <h6>${preTaxPrice.toFixed(2)}</h6>
                      </div>
                    </Row>
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h6>Estimated Tax</h6>
                        <h6>${tax.toFixed(2)}</h6>
                      </div>
                    </Row>
                    <hr
                    className='my-2'
                      style={{
                        backgroundColor: '#CCCBCB'
                      }}
                    />
                    <Row>
                      <div className="d-flex justify-content-between align-self-center">
                        <h5 style={{ fontWeight: '800'}}>Total</h5>
                        <h5 style={{ fontWeight: '800'}}>${totalPrice.toFixed(2)}</h5>
                      </div>
                    </Row>
                    <Row >
                        <h5 style={{paddingTop:20, fontWeight: '800'}}>Select Form of Payment</h5>
                        <Col  className="col ">
                          <div className="col ">
                            <Card key="cashOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/cashLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with Cash</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                        <Col  className="col ">
                          <div className="col ">
                            <Card key="cardOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/cardLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with Card</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                        <Col >
                          <div className="col">
                            <Card key="diningdollarsOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/schoolMoneyLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>Pay with dining dollars</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                  </Card.Body>
                  <Card.Footer style={{height: '5rem'}}>
                    <Button disabled={totalPrice === 0} variant="panda-btn" size="lg" className="my-2 bg-red btn-block text-white" id="bowl" onClick={() => orderSend()} style={{fontWeight: 800}}>ORDER NOW</Button>
                  </Card.Footer>
                </Card>
              </Col>
          </Container>
      </div>)
    );
}
export default CheckoutEmployee;