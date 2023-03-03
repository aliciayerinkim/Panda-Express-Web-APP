import React from 'react';
import '../components/styles.scss';
import HomeNav from "../components/HomeNav";
import WokBackground from "../images/WokBackground.png";
import { Button, Col, Container, Row } from 'react-bootstrap';
// import PollyHelper from "../components/PollyHelper";
import {useState, useEffect } from 'react';
import { translate } from "../connections/translationFunctions";
import useLocalStorage from '../local_storage/useLocalStorage';
/**
 * The homepage view.
 * @author Joseph Quismorio
 */
function Home(){
  const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en'); // en is default if there is no current language
  const targetLanguage = localStorageInfo[0];

  const textList = [
    "WELCOME TO PANDA EXPRESS",
    "Where the way we wok inspires a fresh, flavorful combination of Chinese regional cuisine and technique with bold American tastes. Welcome to our kitchen.",
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

    return (
        <div className="home" style={{height:'100vh', backgroundImage: `url(${WokBackground}`, backgroundSize: 'cover'}}>
          <HomeNav />
          <Container className="container justify-content-center" style={{display:'flex'}}>
            <Row className="w-auto text-center" style={{marginTop: "35vh"}}>
              <Col></Col>
              <Col className='text-white'>
                <h1 className="mb-3" style={{fontWeight: 800, textTransform: 'uppercase'}}>{translatedTextList[0]}</h1>
                <p style={{fontWeight: 400}}>
                  {translatedTextList[1]}
                </p>
                <Button variant="panda-btn mt-3" size="lg" className="bg-red text-white" href='/order' style={{fontWeight: 800, width: "300px"}}>{translatedTextList[2]}</Button>
        
                {/* <p className="text-white">
                text
            </p> */}

              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
        </div>
      );
}

export default Home; 