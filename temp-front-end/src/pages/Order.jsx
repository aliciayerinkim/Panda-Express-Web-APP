import React from 'react';
import '../components/styles.scss';
import HomeNav from "../components/HomeNav";
import WokBackground from "../images/WokBackground.png"
import { Button, Card, Container, Row } from 'react-bootstrap';

import {useState, useEffect } from 'react';
import { translate } from "../connections/translationFunctions";
import useLocalStorage from '../local_storage/useLocalStorage';

/**
 * The order page view. Allows users to
 * view options for a meal, including bowls,
 * plates, bigger plates, a la carte items, and
 * drinks.
 * @author Joseph Quismorio
 */
function Order(){
  ///////////////// TRANSLATION STARTS HERE ////////////////////////////////////////////
  const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en'); // en is default if there is no current language
  const targetLanguage = localStorageInfo[0];

  const textList = [
    "WE WOK FOR YOU",
    "Continue your order by selecting below.",
    "Bowl",
    "1 Side & 1 Entree",
    "Plate",
    "1 Side & 2 Entrees",
    "Bigger Plate",
    "1 Side & 3 Entrees",
    "A La Carte",
    "Individual Sides & Entrees",
    "Drink",
    "Add a Refreshing Beverage",
    "ORDER NOW"
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


    return (
        <div style={{backgroundImage: `url(${WokBackground}`, backgroundSize: 'cover'}}>
          <HomeNav />
          <Container className="container" style={{display:'flex'}}>
            <Row className="w-auto justify-content-center text-center" style={{ marginTop: "18vh", marginBottom: "6vh"}}>
              <h1 className="mb-2 text-center text-white" style={{fontWeight: 800}}>{translatedTextList[0]}</h1>
              <p className="mb-4 text-center text-white" style={{fontWeight: 400}}>{translatedTextList[1]}</p>
              {[
                  {item: 'Bowl', desc: translatedTextList[3], route: 'bowl'},
                  {item: 'Plate', desc: translatedTextList[5], route: 'plate'},
                  {item: 'Bigger Plate', desc: translatedTextList[7], route: 'bigger-plate'},
                  {item: 'A La Carte', desc: translatedTextList[9], route: 'a-la-carte'},
                  {item: 'Drink', desc: translatedTextList[11], route: 'drink'},
                ].map((menuItem) => (
                  <Card key={menuItem.item} style={{ width: '18rem', boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }} className="mx-4 mb-4">
                    <Card.Img variant="top" src={require(`../images/${menuItem.item.split(' ').join('')}.png`)} />
                    <Card.Body className="text-center">
                      <Card.Title style={{ fontWeight: '800', textTransform: 'uppercase'}} >{menuItem.item}</Card.Title>
                      <Card.Text>
                        {menuItem.desc}
                      </Card.Text>
                      <Button variant="panda-btn" size="md" className="bg-red text-white" id="bowl" href={`/order/create-order/?id=${menuItem.route}`} style={{fontWeight: 800}}>{translatedTextList[12]}</Button>
                    </Card.Body>
                  </Card>
                ))}
            </Row>
          </Container>
        </div>
      );
}

export default Order;