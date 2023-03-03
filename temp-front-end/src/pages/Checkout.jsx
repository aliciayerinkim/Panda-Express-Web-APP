//import React from 'react';
import React, {useState, useEffect} from 'react';
import '../components/styles.scss';
import { useNavigate } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import EmployeeNav from '../components/EmployeeNav';
import { Col, Row, Button, Card, Container, ToggleButtonGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { Order } from '../classes/Order';
import { findNextOrderId, sendOrder} from "../connections/orderFunctions";
import { Meal } from '../classes/Meal'
import Maps from '../components/Maps'
//import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { translate } from "../connections/translationFunctions";
import useLocalStorage from '../local_storage/useLocalStorage';

/**
 * Allows a non-employee user to check out an order.
 * @param {Array} cart - The current cart.
 * @param {Setter} setCart - The setter function for the current cart.
 * @param {Setter} setOrderInProgress - The setter function for the current order in progress.
 * @author Joseph Quismorio
 */
function Checkout({ cart, setCart, orderInProgress, setOrderInProgress }){
    ///////////////// TRANSLATION STARTS HERE //////////////////////////////////////////// hi
    const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en'); // en is default if there is no current language
    const targetLanguage = localStorageInfo[0];
  
    const textList = [
      "ADD MORE ITEMS",
      "YOUR ORDER",
      "Add some items to your order.",
      "CHECKOUT",
      "PICKUP",
      "DELIVERY",
      "Subtotal",
      "Estimated Tax",
      "Total",
      "ORDER NOW",
      "REMOVE ITEM",
      "Select Form of Payment",
      "PAY WITH CASH",
      "PAY WITH CARD",
      "PAY WITH DINING DOLLARS"
    ];
  
    const [translatedTextList, setTranslatedTextList] = useState([]);
  
    useEffect(() => {
      async function trans() {
        const transList = []
        for (var i = 0; i < textList.length; i++) { 
          let translatedText = await translate(textList[i], targetLanguage)
          transList.push(translatedText)
        }
        setTranslatedTextList(transList)
      }
      trans();
    }, []);
    ////////////////////////// TRANSLATION ENDS HERE ///////////////////////

    const [width, setWidth] = useState(window.innerWidth);
    const [orderId, setOrderId] = useState(0);
    const [delivery, setDelivery] = useState(false);
    const breakpoint = 1200;

    useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    useEffect(() => {
      async function getOrderId() {
        // console.log(username);
        // console.log(password);
        let data = await findNextOrderId(); 
        setOrderId(data);
        //console.log(employeeData);
      }
      getOrderId();
    }, []);

    console.log(orderId);

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
      setOrderInProgress([]);
      setOrderInProgress([cart, totalPrice, orderId]);
      setCart([]);
      navigate("/order/order-confirmation");

    };
  
    return (
      width > breakpoint ?
        (<div>
          {window.location.pathname === '/dashboard/checkout' ? <EmployeeNav/> : <HomeNav />}
            <Container className="container" style={{marginTop: '18vh', marginBottom: '6vh'}}>
              <Row className="justify-content-between">
                <Col>
                  <Button variant="panda-btn" size="md" className="bg-red text-white mb-4" href='/order/' style={{fontWeight: 800}}>{translatedTextList[0]}</Button>
                  <h3 className="mb-4" style={{fontWeight: 600}}>{translatedTextList[1]}</h3>
                  {(cart.length === 0)? <h6>{translatedTextList[2]}</h6> :
                    cart.map((item) => (
                      <Card key={item.name} style={{ width: '42vw', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="card mr-4 mb-4">
                        <Row className="p-4">
                          <Col>
                              <img src={require(`../images/${item.name}.png`)} alt="" className="img-fluid"/>
                            </Col>
                            <Col>
                              <h6 style={{fontWeight: '600'}}>{item.name} x{item.noItems}</h6>
                              <p style={{ fontSize: '12px', fontWeight: '400'}}>{item.entrees.length === 0 ? `${item.addOnItem}` : `${item.side}, ${item.entrees}`}</p>
                              <p style={{ fontSize: '16px', fontWeight: '600'}}>${item.price.toFixed(2)}</p>
                              {item.addOnItem === 'Fountain Drink' && delivery === true ? 
                              <select class="form-select" id="inputGroupSelect01">
                                  <option value={'0'}>Pepsi</option>
                                  <option value={'1'}>Diet Pepsi</option>
                                  <option value={'2'}>Dr. Pepper</option>
                                  <option value={'3'}>Diet Dr. Pepper</option>
                                  <option value={'4'}>Sierra Mist</option>
                                  <option value={'5'}>Mtn Dew</option>
                                  <option value={'6'}>Root Beer</option>
                                  <option value={'7'}>Water</option>
                                </select>
                              :
                              <div></div>}
                            </Col>
                            <Col className="text-right my-auto">
                            <Button variant="panda-btn" size="sm" className="bg-red text-white mb-2" id="bowl" onClick={() => removeFromCart(item)} style={{fontWeight: 800}}>{translatedTextList[10]}</Button>
                            </Col>
                        </Row>
                      </Card>
                    ))
                  }
                </Col>
                <Col>
                  <Card style={{boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}}>
                    <Card.Header style={{ height: '3rem'}}>
                        <Card.Title className="mt-1 text-center" style={{ fontWeight: '800'}}>{translatedTextList[3]}</Card.Title>
                    </Card.Header>
                    <Card.Body className="text-center">
                      <Row>
                          <ToggleButtonGroup type="radio" name="options" exclusive defaultValue={1} className='mb-2'>
                              <ToggleButton onClick={() => setDelivery(false)} id="tbg-radio-1" value={1} variant="panda-btn" style={{ fontWeight: '800'}}>
                              {translatedTextList[4]}
                              </ToggleButton>
                              <ToggleButton onClick={() => setDelivery(true)} id="tbg-radio-2" value={2} variant="panda-btn" style={{ fontWeight: '800'}}>
                              {translatedTextList[5]}
                              </ToggleButton>
                          </ToggleButtonGroup>
                      </Row>
                      <Row className='justify-content-center mb-4'>
                        <Maps/>
                      </Row>
                      <Row>
                        <div className="d-flex justify-content-between align-self-center">
                          <h6>{translatedTextList[6]}</h6>
                          <h6>${preTaxPrice.toFixed(2)}</h6>
                        </div>
                      </Row>
                      <Row>
                        <div className="d-flex justify-content-between align-self-center">
                          <h6>{translatedTextList[7]}</h6>
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
                          <h5 style={{ fontWeight: '800'}}>{translatedTextList[8]}</h5>
                          <h5 style={{ fontWeight: '800'}}>${totalPrice.toFixed(2)}</h5>
                        </div>
                      </Row>
                      <Row >
                        <h5 style={{paddingTop:20, fontWeight: '800'}}>{translatedTextList[11]}</h5>
                        <Col  className="col ">
                          <div className="col ">
                            <Card key="cashOrder" className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                              <Row className="my-auto">
                                  <img src={require("../images/cashLogo.jpg")} alt="" className="img-fluid"/>
                              </Row>
                              <Row className="my-auto">
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[12]}</h6>
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
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[13]}</h6>
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
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[14]}</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer style={{height: '5rem'}}>
                      <Button disabled={totalPrice === 0} variant="panda-btn" size="lg" className="my-2 bg-red btn-block text-white" id="bowl" onClick={() => orderSend()} style={{fontWeight: 800}}>{translatedTextList[9]}</Button>
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
                  <Button variant="panda-btn" size="md" className="bg-red text-white mb-4" href='/order/' style={{fontWeight: 800}}>{translatedTextList[0]}</Button>
                  <h3 className="mb-4" style={{fontWeight: 600}}>{translatedTextList[1]}</h3>
                  {(cart.length === 0)? <h6>{translatedTextList[2]}</h6> :
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
                              {item.addOnItem === 'Fountain Drink' && delivery === true ? 
                              <select class="form-select" id="inputGroupSelect01">
                                  <option value={'0'}>Pepsi</option>
                                  <option value={'1'}>Diet Pepsi</option>
                                  <option value={'2'}>Dr. Pepper</option>
                                  <option value={'3'}>Diet Dr. Pepper</option>
                                  <option value={'4'}>Sierra Mist</option>
                                  <option value={'5'}>Mtn Dew</option>
                                  <option value={'6'}>Root Beer</option>
                                  <option value={'7'}>Water</option>
                                </select>
                              :
                              <div></div>}
                            </Col>
                            <Col className="text-right">
                            <Button variant="panda-btn" size="sm" className="bg-red text-white" id="bowl" onClick={() => removeFromCart(item)} style={{fontWeight: 800}}>{translatedTextList[10]}</Button>
                            </Col>
                        </Row>
                      </Card>
                    ))
                  }
                </Col>
                <Col>
                  <Card style={{ boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}}>
                    <Card.Header style={{ height: '3rem'}}>
                        <Card.Title className="mt-1 text-center" style={{ fontWeight: '800'}}>{translatedTextList[3]}</Card.Title>
                    </Card.Header>
                    <Card.Body className="text-center">
                      <Row>
                          <ToggleButtonGroup type="radio" name="options" exclusive defaultValue={1} className='mb-2'>
                              <ToggleButton onClick={() => setDelivery(false)} id="tbg-radio-1" value={1} variant="panda-btn" style={{ fontWeight: '800'}}>
                              {translatedTextList[4]}
                              </ToggleButton>
                              <ToggleButton onClick={() => setDelivery(true)} id="tbg-radio-2" value={2} variant="panda-btn" style={{ fontWeight: '800'}}>
                              {translatedTextList[5]}
                              </ToggleButton>
                          </ToggleButtonGroup>
                      </Row>
                      <Row className='justify-content-center mb-4'>
                        <Maps/>
                      </Row>
                      <Row>
                        <div className="d-flex justify-content-between align-self-center">
                          <h6>{translatedTextList[6]}</h6>
                          <h6>${preTaxPrice.toFixed(2)}</h6>
                        </div>
                      </Row>
                      <Row>
                        <div className="d-flex justify-content-between align-self-center">
                          <h6>{translatedTextList[7]}</h6>
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
                          <h5 style={{ fontWeight: '800'}}>{translatedTextList[8]}</h5>
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
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[12]}</h6>
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
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[13]}</h6>
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
                                  <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{translatedTextList[14]}</h6>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer style={{height: '5rem'}}>
                      <Button disabled={totalPrice === 0} variant="panda-btn" size="lg" className="my-2 bg-red btn-block text-white" id="bowl" onClick={() => orderSend()} style={{fontWeight: 800}}>{translatedTextList[9]}</Button>
                    </Card.Footer>
                  </Card>
                </Col>
            </Container>
        </div>)
      );
}
export default Checkout;