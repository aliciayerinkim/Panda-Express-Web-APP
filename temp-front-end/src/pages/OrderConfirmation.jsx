//import React from 'react';
import React, {useState, useEffect} from 'react';
import '../components/styles.scss';
import { useNavigate } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import EmployeeNav from '../components/EmployeeNav';
import { Col, Row, Button, Card, Container, ToggleButtonGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { Order } from '../classes/Order';
import { sendOrder} from "../connections/orderFunctions";
import { Meal } from '../classes/Meal'
import Maps from '../components/Maps'
//import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { translate } from "../connections/translationFunctions";
import useLocalStorage from '../local_storage/useLocalStorage';

/**
 * Order confirmation view for a customer-side
 * order. Displays everything that was ordered,
 * the order ID, and the total cost of that order.
 * @param {Array} orderInProgress - The current order in progress.
 * @param {Setter} setOrderInProgress - The setter function for the current order in progress.
 * @author Joseph Quismorio
 */

function OrderConfirmation({ orderInProgress, setOrderInProgress }){
    ///////////////// TRANSLATION STARTS HERE ////////////////////////////////////////////
    const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en'); // en is default if there is no current language
    const targetLanguage = localStorageInfo[0];
  
    const textList = [
      "ORDER MORE",
      "THANK YOU",
      "Your order total was",
      "Your order number is",
      "ORDER:"
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
    const breakpoint = 1200;

    useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    let preTaxPrice = 0;

    for (let i = 0; i < orderInProgress.length; i++){
      preTaxPrice += orderInProgress[i].price;
    }

    let tax = preTaxPrice * 0.0825;
    let totalPrice = preTaxPrice + tax;

    const removeFromorderInProgress = (productToRemove) => {
      setOrderInProgress(orderInProgress.filter((product) => product !== productToRemove));
    };

    const navigate = useNavigate();

    return (
        (<div>
          {window.location.pathname === '/dashboard/checkout' ? <EmployeeNav/> : <HomeNav />}
            <Container className="container" style={{marginTop: '18vh', marginBottom: '6vh'}}>
              <Row className="justify-content-between">
                <Col>
                  <Button variant="panda-btn" size="md" className="bg-red text-white mb-4" href='/order/' style={{fontWeight: 800}}>{translatedTextList[0]}</Button>
                    {localStorage.getItem('isLoggedIn') === 'true' ? <h3 className="mb-4" style={{fontWeight: 600, textTransform: 'uppercase'}}>{translatedTextList[1]}, {JSON.parse(localStorage.getItem('user')).given_name}!</h3> : <h3 className="mb-4" style={{fontWeight: 600}}>{translatedTextList[1]}!</h3>}
                   {(orderInProgress.length === 0)? <div></div> : <h5>{translatedTextList[2]} ${orderInProgress[1].toFixed(2)}</h5>}
                   {(orderInProgress.length === 0)? <div></div> : <h5>{translatedTextList[3]} #{orderInProgress[2]}</h5>}
                   {translatedTextList[4]}
                  {(orderInProgress.length === 0)? <h6>Add some items to your order.</h6> :
                    orderInProgress[0].map((item) => (
                      <Card key={item.name} style={{ width: '42vw', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="card mr-4 mb-4">
                        <Row className="p-4">
                          <Col>
                              <img src={require(`../images/${item.name}.png`)} alt="" className="img-fluid"/>
                            </Col>
                            <Col className="my-auto">
                              <h6 style={{fontWeight: '600'}}>{item.name} x{item.noItems}</h6>
                              <p style={{ fontSize: '12px', fontWeight: '400'}}>{item.entrees.length === 0 ? `${item.addOnItem}` : `${item.side}, ${item.entrees}`}</p>
                            </Col>
                            <Col className="text-right my-auto">
                            </Col>
                        </Row>
                      </Card>
                    ))
                    
                  }
                <Row className='justify-content-center mb-4'>
                    <Maps/>
                </Row>
                </Col>
              </Row>
            </Container>
        </div>)
      );
}
export default OrderConfirmation;