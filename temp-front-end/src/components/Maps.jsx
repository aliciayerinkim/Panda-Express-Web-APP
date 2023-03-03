/**
* This file will generate map with choices of transportation and user input address with auto complete functionally to generate routes
* @author Alicia Kim - 131003034
*/

import React, { useState, useCallback, useEffect, Component} from "react";
import { Button, Row, InputGroup, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker, Autocomplete} from '@react-google-maps/api';

const loc = {
    lat: 30.612379915919746,
    lng: -96.34152692140881
};

/**
* This class will have functions to check what transportation user has chosen and what origin they have inputed to generate routes from their origin to specific desitination stated in contructor and display the routes on the map generated
*/
class Directions extends Component {

  /**
  * Constructor of Directions. Set default state and bind all functions
  * @param {object} props
  * @return {}
  */

  constructor (props) {
    super(props)

    this.state = {
      response: null,
      travelMode: 'DRIVING',
      origin: '',
      destination: 'Memorial Student Center, 275 Joe Routt Blvd, College Station, TX 77840'
    }

    this.directionsCallback = this.directionsCallback.bind(this)
    this.checkDriving = this.checkDriving.bind(this)
    this.checkBicycling = this.checkBicycling.bind(this)
    this.checkTransit = this.checkTransit.bind(this)
    this.checkWalking = this.checkWalking.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  /**
  * Gets a parameter with response and sets the current state to states of the parameter given
  * @param {class} response - Direction class
  * @return {}
  */
  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  /**
  * When the target is checked. it sets the current travelMode to DRIVING
  * @param {any} checked - components
  * @return {} 
  */
  checkDriving ({ target: { checked } }) {
      checked &&
        this.setState(
          () => ({
            travelMode: 'DRIVING'
          })
        )
    }
  
  /**
  * When the target is checked. it sets the current travelMode to BICYCLING
  * @param {any} checked - components
  * @return {}
  */
  checkBicycling ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'BICYCLING'
        })
      )
  }
  
  /**
  * When the target is checked. it sets the current travelMode to TRANSIT
  * @param {any} checked - components
  * @return {}
  */
  checkTransit ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'TRANSIT'
        })
      )
  }

  /**
  * When the target is checked. it sets the current travelMode to WALKING
  * @param {any} checked - components
  * @return {}
  */
  checkWalking ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'WALKING'
        })
      )
  }

  /**
  * Sets current origin to the new origin given through parameter without using setState
  * @param {string} ref - new origin to set
  * @return {}
  */
  getOrigin (ref) {
    this.origin = ref
  }

  /**
  * IF the value of current origin is not null, it sets the current origin to the current value of origin
  * @param {}
  * @return {}
  */
  onClick () {
    if (this.origin.value !== '' ) {
      this.setState(
        () => ({
          origin: this.origin.value
        })
      )
    }
  }

  /**
  * Generate a map that can display routes with user input address and user selection on travelmode
  * @param {}
  * @return {} - user input box with selection of travelmode and a map that can display routes
  */
  render () {
    return (
      <div className='map'>
        <div className='map-settings'>   
          <Row className='d-inline-flex'>
          <InputGroup className="mb-3 px-3">
            <Autocomplete>
              <Form.Control
              id='ORIGIN'
              placeholder="Address"
              aria-label="Address"
              aria-describedby="basic-addon2"
              ref={this.getOrigin}
              required
              style={{width: '35vmin'}}
              />
              </Autocomplete>
              <Button variant="panda-btn" style={{fontWeight: '600'}} onClick={this.onClick}>
              GET DIRECTIONS
              </Button>
          </InputGroup>
          </Row>
          <div className='travel-mode d-inline-flex'>
          <Row>
            <div className='d-flex flex-wrap'>
              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='DRIVING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'DRIVING'}
                  onChange={this.checkDriving}
                />
                <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='BICYCLING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'BICYCLING'}
                  onChange={this.checkBicycling}
                />
                <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='TRANSIT'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'TRANSIT'}
                  onChange={this.checkTransit}
                />
                <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'WALKING'}
                  onChange={this.checkWalking}
                />
                <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
              </div>
            </div>
          </Row> 
        </div>
        </div>

        <div className='map-container'>
          
          <GoogleMap
            mapContainerStyle={{
              height: '30vh',
              width: '100%'
            }}
            zoom={14}
            center={loc}
          >
            {
              this.state.origin !== '' && (
                <DirectionsService
                  options={{ 
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: this.state.travelMode
                  }}
                  callback={this.directionsCallback}
                />
              )
            }

            {
              this.state.response !== null && (
                <DirectionsRenderer
                  options={{  
                    directions: this.state.response
                  }}
                />
              )
            }
          <Marker position={loc}/>
          </GoogleMap>
        </div>
      </div>
    )
  }
}

/**
* Description
* @param {}
* @return {class} - if map can be loaded properly it will run the Direction class and return the class
*/
function Maps(){

  const {isLoaded} = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey:"AIzaSyAtO-aoWncgkDfaLDoI2EhIJHjRlrUNhuM",
//     libraries:['places']
  })

  return isLoaded ? (
    <div>
      <Directions />
    </div>
    
    ) : <div></div>
  }
  export default Maps;
