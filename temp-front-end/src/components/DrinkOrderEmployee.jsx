import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/styles.scss';
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import { updateMenu } from "../connections/menuFunctions";
import { Menu } from "../classes/Menu";
import { Container, Col, Row, Button, Card, Collapse, ButtonGroup } from 'react-bootstrap';
import EmployeeNav from './EmployeeNav';

let nextId = 0;
/**
 * Lets a server add a drink item to an order.
 * @param {Array} cart - The current cart.
 * @param {Setter} setCart - The setter function for the current cart.
 * @author Molly Frost
 */
function DrinkOrderEmployee({cart, setCart}){
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    const [drinks, setDrinks] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);

    const breakpoint = 1200;

    useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    const [menu, setMenu] = useState(new Menu())

    useEffect(() => {
      async function getMenu() {
        let data = await updateMenu();
        var menuN = new Menu(data);
        setMenu(menuN);
      }
      getMenu();
    }, []);
    
    var mealName = id;
    mealName = mealName.replace(/-/g, ' ');
    mealName = mealName.split(" ");
    for (let i = 0; i < mealName.length; i++) {
      mealName[i] = mealName[i][0].toUpperCase() + mealName[i].substr(1);
    }
    
    mealName = mealName.join(" ");

    const [drinkPrice, setDrinkPrice] = useState(0);

    const [number, setNumber] = useState(1);

    const increment = () => {
      setNumber(prevCount => prevCount + 1);
      setDrinkPrice(prevPrice => prevPrice + drinks[0].price);
    };

    const decrement = () => {
      setNumber(prevCount => prevCount - 1);
      setDrinkPrice(prevPrice => prevPrice - drinks[0].price);
    };

    const addDrinks = (drinkName, drinkId, drinkPrice) => {
        if (drinks.length >= 1){
          alert("Entree limit exceeded.");
        }else{
          setDrinks([...drinks, {id: nextId++, name: drinkName, itemId: drinkId, price: drinkPrice, category: 'Drink'}]);
          setDrinkPrice(prevPrice => prevPrice + drinkPrice);
        }
    };

    const deleteDrinks = (item) => {
      setDrinks(drinks.filter(m => m.id !== item.id))
      setNumber(1);
      setDrinkPrice(0);
    }
  
    const checkDrink = () => {
    if (drinks.length === 0){
        alert("Please add items to your meal.");
    }else {
        let items = [];

        for (let i = 0; i < drinks.length; i++) {
        items.push(drinks[i].name);
        }

        items = items.join(', ');

        let newCart = [...cart];

        let cartItem = {name: "Drink", side: items, entrees: "", price: (drinks[0].price * number), addOnItem: items, itemId: drinks[0].itemId, noItems: number};

        newCart.push(cartItem);

        setCart(newCart);
        let navWhere;
        if (window.location.pathname === '/dashboard/create-order/'){
          navWhere = '/dashboard/checkout'
        }else if (window.location.pathname === '/order/create-order/'){
          navWhere = '/order/checkout'
        }
        
        navigate(navWhere);
    }
    }

    return (
        width < breakpoint ?
        (<div>
          {window.location.pathname === '/dashboard/create-order/' ? <EmployeeNav/> : <HomeNav />}
            <Container className="container" style={{marginTop: '18vh', marginBottom: '14vh'}}>
            <Button variant="panda-btn" size="md" onClick={() => navigate(-1)} style={{fontWeight: 800}} className="mt-2 mb-4">BACK TO MENU</Button>{' '}
              <Row className="mx-auto">
                <Col>
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>DRINKS</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Choose A Refreshing Beverage</p>
                    {menu.getAllDrinks.map((drink) => (
                      <Card key={drink.getProductName} onClick={() => addDrinks(drink.getProductName, drink.getMenuItemId, drink.getSalePrice)} className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                        <Row>
                          <Col className="my-auto">
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{drink.getProductName}</h6>
                          </Col>
                        </Row>
                      </Card>))}
                  </Row>
                </Col>
              </Row>
              <br />
              <div className="fixed-bottom">
              <div className='bg-red'>
                    <Row className='w-auto'>
                        <Col xs={7} md={8} className='text-white text-left'>
                            <div className="my-3 ml-4">
                                <h5 style={{textTransform: 'uppercase', fontWeight: '600'}}>{mealName}</h5>
                                <h6 style={{fontSize: '14px'}}>
                                    {(drinks.length === 0) ? "Add some items." : `${drinks[0].name}`}
                                </h6>
                            </div>
                        </Col>
                        <Col xs={5} md={4} className='text-right'>
                            <Button
                                variant="panda-btn-alt" size="md" style={{fontWeight: 800, color: '#D02B2E'}} className="my-4 mr-4"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                VIEW MEAL
                            </Button>
                        </Col>
                    </Row>
                  </div>
                  <div style={{backgroundColor: 'white'}}>
                    <Collapse in={open}>
                      <div id="example-collapse-text" >
                          {
                            drinks.map((item) => (
                            <Row key={item.name} className='d-inline-flex my-3' style={{width: "100%"}}>
                              <Col className='my-auto'>
                                <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                                <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                              </Col>
                              <Col className="my-auto text-right">
                              <Button variant="panda-btn" size="md" className="bg-red text-white" onClick={() => deleteDrinks(item)} style={{fontWeight: 800}}>REMOVE</Button>
                              </Col>
                            </Row>))
                          }
                          <div className="text-center" style={{width: "100%", backgroundColor: "#f7f7f6", borderTop: "1px solid #cbcbcb"}}>
                            <Row className='d-inline-flex my-3' style={{width: "100%"}}>
                              <Col>
                                <Button disabled={(drinks.length === 0)} variant="panda-btn" size="md" className="mt-2 bg-red text-white" onClick={() => checkDrink()} style={{fontWeight: 800, width: "100%"}}>ADD TO ORDER</Button>
                              </Col>
                            </Row>
                          </div>
                      </div>
                    </Collapse>
                  </div>
              </div>
            </Container>
        </div>)
        :
        (<div>
          {window.location.pathname === '/dashboard/create-order/' ? <EmployeeNav/> : <HomeNav />}
            <Container className="container" style={{marginTop: '18vh', marginBottom: '14vh'}}>
              <Row>
                <Col>
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>DRINKS</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Choose A Refreshing Beverage</p>
                    {menu.getAllDrinks.map((drink) => (
                    <Card key={drink.getProductName} onClick={() => addDrinks(drink.getProductName, drink.getMenuItemId, drink.getSalePrice)} style={{cursor: "pointer", width: '14rem', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}} className="mx-2 mb-2">
                      <Card.Body className="text-center">
                        <Card.Title style={{ fontWeight: '800'}} >{drink.getProductName}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                  </Row>
                </Col>
                <Col xs={5}>
                  <Card style={{ width: '35vw', height: '65vh', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="position-fixed ml-4">
                    <Card.Header style={{ height: '5rem'}}>
                        <Card.Title className="mt-1 text-center" style={{ fontWeight: '800'}}>CURRENT MEAL</Card.Title>
                        <Card.Text className="text-center" style={{fontSize: '14px'}}>
                          Add some items to your meal.
                        </Card.Text>
                    </Card.Header>
                    <Card.Body style={{overflowY: 'scroll'}}>
                      {
                        drinks.map((item) => (
                        <Row key={item.name} className='d-inline-flex mb-3'>
                          <Col>
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                            <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                          </Col>
                          <Col className="text-right">
                          <Button variant="panda-btn" size="sm" className="mt-2 bg-red text-white" onClick={() => deleteDrinks(item)} style={{fontWeight: 800}}>REMOVE ITEM</Button>
                          </Col>
                        </Row>))
                      }
                    </Card.Body>
                    <Card.Footer style={{height: '4rem'}}>
                      <Row>
                        <Col xs={3}>
                          <h5 className="ml-2 mt-2" style={{textTransform: 'uppercase', fontWeight: '600'}}>${drinkPrice.toFixed(2)}</h5>
                        </Col>
                        <Col className="d-flex justify-content-right my-auto">
                          <ButtonGroup size="sm" className="mt-1" aria-label="Basic example" style={{borderStyle: 'solid', borderColor: '#D02B2E', fontWeight: 800}}>
                            <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => decrement()} disabled={number === 1 || (drinks.length === 0)}>-</Button>
                            <div className="my-auto">
                              <p className="mx-3 my-auto">{number}</p>
                            </div>
                            <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => increment()} disabled={(drinks.length === 0)}>+</Button>
                          </ButtonGroup>
                        </Col>
                        <Col className="text-right">
                          <Button disabled={(drinks.length === 0)} variant="panda-btn" size="md" className="mt-1 mr-2 bg-red text-white" onClick={() => checkDrink()} style={{fontWeight: 800}}>ADD TO ORDER</Button>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          <Footer/>
        </div>)
      );
}
export default DrinkOrderEmployee;