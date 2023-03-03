import React from 'react';
import '../components/styles.scss';
import EmployeeNav from "../components/EmployeeNav";
import { Container, Row, Card, Button, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

/**
 * Server dashboard view for employees. Allows
 * employees to select meals to take orders for
 * customers.
 * @param {Setter} setCart - The setter function for the current cart.
 * @param {Setter} setUser - The setter function for the current user.
 * @param {Setter} setIsLoggedIn - The setter function for the current login status.
 * @param {Setter} setIsManager - The setter function for the current manager status.
 * @author Joseph Quismorio
 */
function Dashboard({setCart, setUser, setIsLoggedIn, setIsManager}){
    return (
        <div>
        <div>
          <EmployeeNav setCart={setCart} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager} />
          <Container className="container" style={{display:'flex'}}>
            <Row className="w-auto justify-content-center text-center" style={{ marginTop: "18vh", marginBottom: "6vh"}}>
              <h1 className="mb-4 text-center" style={{fontWeight: 800}}>EMPLOYEE DASHBOARD</h1>
              {[
                  {item: 'Bowl', desc: '1 Side & 1 Entree', route: 'bowl'},
                  {item: 'Plate', desc: '1 Side & 2 Entrees', route: 'plate'},
                  {item: 'Bigger Plate', desc: '1 Side & 3 Entrees', route: 'bigger-plate'},
                  {item: 'A La Carte', desc: 'Individual Sides & Entrees', route: 'a-la-carte'},
                  {item: 'Drink', desc: 'Add a Beverage', route: 'drink'},
                ].map((menuItem) => (
                  <Card key={menuItem.item} style={{ width: '18rem', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }} className="mx-4 mb-4">
                    <Card.Body className="text-center">
                      <Card.Title style={{ fontWeight: '800', textTransform: 'uppercase'}} >{menuItem.item}</Card.Title>
                      <Card.Text>
                        {menuItem.desc}
                      </Card.Text>
                      <Button variant="panda-btn" size="md" className="bg-red text-white" id="bowl" href={`/dashboard/create-order/?id=${menuItem.route}`} style={{fontWeight: 800}}>ORDER NOW</Button>
                    </Card.Body>
                  </Card>
                ))}
            </Row>
          </Container>
        </div>
        </div>
      );
}

export default Dashboard; 