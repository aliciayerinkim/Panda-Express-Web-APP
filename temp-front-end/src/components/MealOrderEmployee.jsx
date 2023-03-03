import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/styles.scss';
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import { updateMenu } from "../connections/menuFunctions";
import { Menu } from "../classes/Menu";
import { Container, Col, Row, Button, Card, Collapse, ButtonGroup } from 'react-bootstrap';
import { getMealTypeInfo } from '../connections/mealTypeFunctions';
import EmployeeNav from './EmployeeNav';

let nextId = 0;

/**
 * Lets a server add a meal item to an order.
 * @param {Array} cart - The current cart.
 * @param {Setter} setCart - The setter function for the current cart.
 * @author Molly Frost
 */
function MealOrderEmployee({cart, setCart}){
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const id = query.get("id");
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

    const [mealTypes, setMealTypes] = useState([])

    useEffect(() => {
      async function getMealTypes() {
        let data = await getMealTypeInfo();
        var mealTypes = data;
        setMealTypes(mealTypes);
      }
      getMealTypes();
    }, []);

    //console.log(mealTypes);

    var mealName = id;
    mealName = mealName.replace(/-/g, ' ');
    mealName = mealName.split(" ");
    for (let i = 0; i < mealName.length; i++) {
    mealName[i] = mealName[i][0].toUpperCase() + mealName[i].substr(1);
    }
    
    mealName = mealName.join(" ");

    let numEntrees = 0;
    let price = 0;

    id === "bowl" ? numEntrees = 1 : id === "plate" ? numEntrees = 2 : id === "bigger-plate" ? numEntrees = 3 : numEntrees = 0;
  
    for (let i = 0; i < mealTypes.length; i++){
      if (numEntrees === mealTypes[i].meal_type_id){
        price = mealTypes[i].meal_price;
      }
    }

    const [number, setNumber] = useState(1);

    const increment = () => {
      setNumber(prevCount => prevCount + 1);
    };

    const decrement = () => {
      setNumber(prevCount => prevCount - 1);
    };

    const addSide = (sideName, sideId) => {
        setSides([{name: sideName, itemId: sideId, category: 'Side'}]);
      };
  
      const addEntree = (entreeName, entreeId) => {
        if ((id === 'bowl' && entrees.length === 1) || (id === 'plate' && entrees.length === 2) || (id === 'bigger-plate' && entrees.length === 3)){
          alert("Entree limit exceeded.");
        }else {  
          setEntrees([...entrees, {id: nextId++, name: entreeName, itemId: entreeId, category: 'Entree'}]);
        }
      };

      const checkMeal = () => {
        if (sides.length === 0 || entrees.length === 0 || ((id === 'bowl' && entrees.length < 1) || (id === 'plate' && entrees.length < 2) || (id === 'bigger-plate' && entrees.length < 3))){
          alert("Please add items to your meal.");
        }else {
          let itemsId = [];
          let itemsName = [];
  
          for (let i = 0; i < entrees.length; i++) {
            itemsId.push(entrees[i].itemId);
            itemsName.push(entrees[i].name);
          }
  
          itemsName = itemsName.join(', ');
  
          let mealId;
          let price;
  
          if (id === "bowl"){
            mealId = 1;
          }else if (id === "plate"){
            mealId = 2;
          }else if (id === "bigger-plate"){
            mealId = 3;
          }
  
          for (let i = 0; i < mealTypes.length; i++){
            if (mealId === mealTypes[i].meal_type_id){
              price = mealTypes[i].meal_price;
            }
          }

          let newCart = [...cart];
  
          let cartItem = {name: mealName, side: sides[0].name, entrees: itemsName, price: (price * number), sideId: sides[0].itemId, entreesId: itemsId, mealId: mealId, itemId: 0, noItems: number};
  
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
            <Container className="container" style={{marginTop: '16vh', marginBottom: '14vh'}}>
              <Button variant="panda-btn" size="md" onClick={() => navigate(-1)} style={{fontWeight: 800}} className="mt-2 mb-4">BACK TO MENU</Button>{' '}
              <Row className="mx-auto">
                <Col>
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>STEP 1</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Choose Your Side</p>
                    {menu.getAllSides.map((side) => (
                      <Card key={side.getProductName} onClick={() => addSide(side.getProductName, side.getMenuItemId)} className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                        <Row>
                          <Col className="my-auto">
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{side.getProductName}</h6>
                          </Col>
                        </Row>
                      </Card>))}
                  </Row>
                </Col>
              </Row>
              <br />
              <Row className="mx-auto">
                <Col>
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>STEP 2</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Select {numEntrees} Entrees</p>
                    {menu.getAllEntrees.map((entree) => (
                      <Card key={entree.getProductName} onClick={() => addEntree(entree.getProductName, entree.getMenuItemId)} className='d-inline-flex mb-2' style={{cursor: "pointer", padding: "10px 0px 10px 0px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 5px"}}>
                        <Row>
                          <Col className="my-auto">
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{entree.getProductName}</h6>
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
                                <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>${price.toFixed(2)}</h6>
                                <h6 style={{fontSize: '14px'}}>
                                    {(sides.length === 0 && entrees.length === 0) ? "Add some items to your meal." : "Hi"}
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
                            sides.map((item) => (
                            <Row key={item.name} className='d-inline-flex my-3' style={{width: "100%"}}>
                              <Col className="my-auto">
                                <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                                <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                              </Col>
                              <Col className="my-auto text-right">
                              <Button variant="panda-btn" size="md" className="bg-red text-white" onClick={() => setSides(sides.filter(m => m !== item))} style={{fontWeight: 800}}>REMOVE</Button>
                              </Col>
                            </Row>))
                          }
                          {
                            entrees.map((item) => (
                            <Row key={item.name} className='d-inline-flex my-3' style={{width: "100%"}}>
                              <Col className="my-auto">
                                <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                                <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                              </Col>
                              <Col className="my-auto text-right">
                              <Button variant="panda-btn" size="md" className="bg-red text-white" onClick={() => setEntrees(entrees.filter(m => m.id !== item.id))} style={{fontWeight: 800}}>REMOVE</Button>
                              </Col>
                            </Row>))
                          }
                          <div className="text-center" style={{width: "100%", backgroundColor: "#f7f7f6", borderTop: "1px solid #cbcbcb"}}>
                            <Row className='d-inline-flex my-3' style={{width: "100%"}}>
                              <Col className="d-inline-flex">
                                <ButtonGroup size="sm" className="mt-2" aria-label="Basic example" style={{borderStyle: 'solid', borderColor: '#D02B2E', fontWeight: 800}}>
                                  <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => decrement()} disabled={number === 1 || (sides.length === 0 || entrees.length < numEntrees)}>-</Button>
                                  <div className="my-auto">
                                    <p className="mx-3 my-auto">{number}</p>
                                  </div>
                                  <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => increment()} disabled={(sides.length === 0 || entrees.length < numEntrees)}>+</Button>
                                </ButtonGroup>
                              </Col>
                              <Col>
                                <Button disabled={(sides.length === 0 || entrees.length < numEntrees)} variant="panda-btn" size="md" className="mt-2 bg-red text-white" onClick={() => checkMeal()} style={{fontWeight: 800, width: "100%"}}>ADD TO ORDER</Button>
                              </Col>
                            </Row>
                          </div>
                      </div>
                    </Collapse>
                  </div>
              </div>
            </Container>
        </div>)
        : (<div>
          {window.location.pathname === '/dashboard/create-order/' ? <EmployeeNav/> : <HomeNav />}
            <Container className="container" style={{marginTop: '18vh', marginBottom: '14vh'}}>
              <Row >
                <Col>
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>STEP 1</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Choose Your Side</p>
                    {menu.getAllSides.map((side) => (
                      <Card key={side.getProductName} onClick={() => addSide(side.getProductName, side.getMenuItemId)} style={{cursor: "pointer", width: '14rem', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }} className="mx-2 mb-2">
                        <Card.Body className="text-center">
                          <Card.Title style={{ fontWeight: '800'}} >{side.getProductName}</Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  </Row>
                  <br />
                  <Row>
                    <h1 className="mb-2 text-left" style={{fontWeight: 800}}>STEP 2</h1>
                    <p className="mb-4 text-left" style={{fontWeight: 400}}>Select {numEntrees} Entrees</p>
                    {menu.getAllEntrees.map((entree) => (
                    <Card key={entree.getProductName} onClick={() => addEntree(entree.getProductName, entree.getMenuItemId)} style={{cursor: "pointer", width: '14rem', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}} className="mx-2 mb-2">
                      <Card.Body className="text-center">
                        <Card.Title style={{ fontWeight: '800'}} >{entree.getProductName}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                  </Row>
                </Col>
                <Col xs={5}>
                  <Card style={{width: '35vw', height: '65vh', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px", transition: "all 100s ease-in-out"}} className="position-fixed">
                    <Card.Header style={{ height: '5rem'}}>
                        <Card.Title className="mt-1 text-center" style={{textTransform: 'uppercase', fontWeight: '800'}}>{mealName}</Card.Title>
                        <Card.Text className="text-center" style={{fontSize: '14px'}}>
                          Select 1 Side & {numEntrees} Entrees
                        </Card.Text>
                    </Card.Header>
                    <Card.Body style={{overflowY: 'scroll'}}>
                      {
                        sides.map((item) => (
                        <Row key={item.name} className='d-inline-flex mb-3'>
                          <Col>
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                            <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                          </Col>
                          <Col className="text-right">
                          <Button variant="panda-btn" size="sm" className="mt-2 bg-red text-white" onClick={() => setSides(sides.filter(m => m !== item))} style={{fontWeight: 800}}>REMOVE ITEM</Button>
                          </Col>
                        </Row>))
                      }
                      {
                        entrees.map((item) => (
                        <Row key={item.name} className='d-inline-flex mb-3'>
                          <Col>
                            <h6 style={{textTransform: 'uppercase', fontWeight: '600'}}>{item.name}</h6>
                            <h6 style={{ fontWeight: '400'}}>{item.category}</h6>
                          </Col>
                          <Col className="text-right">
                          <Button variant="panda-btn" size="sm" className="mt-2 bg-red text-white" onClick={() => setEntrees(entrees.filter(m => m.id !== item.id))} style={{fontWeight: 800}}>REMOVE ITEM</Button>
                          </Col>
                        </Row>))
                      }
                    </Card.Body>
                    <Card.Footer style={{height: '4rem'}}>
                      <Row>
                        <Col xs={3}>
                          <h5 className="ml-2 mt-2" style={{ fontWeight: '600'}}>${(price * number).toFixed(2)}</h5>
                        </Col>
                        <Col className="d-flex justify-content-right">
                          <ButtonGroup size="sm" className="mt-1" aria-label="Basic example" style={{borderStyle: 'solid', borderColor: '#D02B2E', fontWeight: 800}}>
                            <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => decrement()} disabled={number === 1 || (sides.length === 0 || entrees.length < numEntrees)}>-</Button>
                            <div className="my-auto">
                              <p className="mx-3 my-auto">{number}</p>
                            </div>
                            <Button variant="panda-btn" style={{fontWeight: 800}} onClick={() => increment()} disabled={(sides.length === 0 || entrees.length < numEntrees)}>+</Button>
                          </ButtonGroup>
                        </Col>
                        <Col className="text-right">
                          <Button disabled={(sides.length === 0 || entrees.length < numEntrees)} variant="panda-btn" size="md" className="mt-1 mr-2 bg-red text-white" onClick={() => checkMeal()} style={{fontWeight: 800}}>ADD TO ORDER</Button>
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

export default MealOrderEmployee;