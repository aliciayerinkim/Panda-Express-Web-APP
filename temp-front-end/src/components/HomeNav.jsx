import { Button, Navbar, Nav, Container} from "react-bootstrap";
import { translate } from "../connections/translationFunctions";
import useLocalStorage from "../local_storage/useLocalStorage";
import React, {useState, useEffect, useContext } from 'react';

/**
 * User side nav bar. Allows users to translate page,
 * sign in, or view cart.
 * @author Aaron Su, Joseph Quismorio
 */
function HomeNav() {
  
  const localStorageInfo = useLocalStorage('CURRENT_LANGUAGE','en');
  const targetLanguage = localStorageInfo[0];
  const setLanguage = localStorageInfo[1];

  const textList = [
    "LOGIN",
    "PROFILE",
    'CART'
    ];

  const [translatedTextList, setTranslatedTextList] = useState([]);

  // FIXME maybe don't call translate when the target language is english.
  useEffect(() => {
    async function trans() {
      //console.log("languageContext: ", targetLanguage);
      const transList = []
      for (var i = 0; i < textList.length; i++) { 
        let translatedText = await translate(textList[i], targetLanguage)
        // console.log("translatedText: ", translatedText)
        transList.push(translatedText)
      }
      setTranslatedTextList(transList)
    }
    trans();
  }, []);

  return (
    <Navbar className="fixed-top bg-red">
      <Container>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={require("../images/PandaExpressLogo.png")}
              width="80"
              height="80"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: 'white', fontWeight: 800, color: '#D02B2E'}}>
            {(targetLanguage == 'en') && <span className="fi fi-us"></span>} 
            {(targetLanguage == 'en') && 'EN'}
            {(targetLanguage == 'es') && <span className="fi fi-es"></span>} 
            {(targetLanguage == 'es') && 'ES'}
            {(targetLanguage == 'fr') && <span className="fi fi-fr"></span>} 
            {(targetLanguage == 'fr') && 'FR'}
            {(targetLanguage == 'zh-cn') && <span className="fi fi-cn"></span>} 
            {(targetLanguage == 'zh-cn') && 'CN'}
            {(targetLanguage == 'ja') && <span className="fi fi-jp"></span>} 
            {(targetLanguage == 'ja') && 'JA'}
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={() => {setLanguage('en'); window.location.reload();}} className="dropdown-item" href="#en"><span className="fi fi-us"></span> EN</a></li>
            <li><a onClick={() => {setLanguage('es'); window.location.reload();}} className="dropdown-item" href="#es"><span className="fi fi-es"></span> ES</a></li>
            <li><a onClick={() => {setLanguage('fr'); window.location.reload();}} className="dropdown-item" href="#fr"><span className="fi fi-fr"></span> FR</a></li>
            <li><a onClick={() => {setLanguage('zh-cn'); window.location.reload();}} className="dropdown-item" href="#cn"><span className="fi fi-cn"></span> CN</a></li>
            <li><a onClick={() => {setLanguage('ja'); window.location.reload();}} className="dropdown-item" href="#ja"><span className="fi fi-jp"></span> JP</a></li>
          </ul>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Button className="mx-3" variant="panda-btn-alt" href='/login' style={{fontWeight: 800, color: '#D02B2E'}}>{localStorage.getItem('isLoggedIn') === 'false' || localStorage.getItem('isLoggedIn') === null  ? translatedTextList[0] : translatedTextList[1]}</Button>{' '}
            <Button className="mr-3" variant="panda-btn-alt" href='/order/checkout' style={{fontWeight: 800, color: '#D02B2E'}}>{translatedTextList[2]}</Button>{' '}
          </Nav>
      </Container>
    </Navbar>
    // <div className="navigation">
    //   <nav className="navbar navbar-expand fixed-top navbar-dark bg-red">
    //     <div className="container">
    //       <NavLink className="navbar-brand" to="/">
    //         <img src={require("../images/PandaExpressLogo.png")} alt="" className="img-fluid app-logo"/>
    //       </NavLink>
    //       <div>
    //         <ul className="navbar-nav ml-auto">
    //           <li className="nav-item mr-3">
    //           </li>
    //           <li className="nav-item nav-btn mr-3">
    //             <Button variant="panda-btn-alt" href='/login' style={{fontWeight: 800, color: '#D02B2E'}}>LOGIN</Button>{' '}
    //           </li>
    //           <li className="nav-item nav-btn mr-3">
    //             <Button variant="panda-btn-alt" href='/order/checkout' style={{fontWeight: 800, color: '#D02B2E'}}>CART</Button>{' '}
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}

export default HomeNav;