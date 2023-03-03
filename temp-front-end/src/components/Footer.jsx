import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

import {useState, useEffect } from 'react';
import { translate } from "../connections/translationFunctions";
import useLocalStorage from '../local_storage/useLocalStorage';

/**
 * Footer that allows any user to go back a page.
 * @author Joseph Quismorio
 */

function Footer() {

    ///////////////// TRANSLATION STARTS HERE ////////////////////////////////////////////
    const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en'); // en is default if there is no current language
    const targetLanguage = localStorageInfo[0];
  
    const textList = [
      "BACK"
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

  const history = useNavigate();
  return (
    <div className="navigation" style={{paddingTop: 40}}>
      <nav className="navbar navbar-expand fixed-bottom navbar-dark bg-red">
        <div className="container">
          <Button variant="panda-btn-alt" size="md" onClick={() => history(-1)} style={{fontWeight: 800, color: '#D02B2E'}} className="my-2 ml-3">{translatedTextList[0]}</Button>{' '}
        </div>
      </nav>
    </div>
  );
}

export default Footer;
