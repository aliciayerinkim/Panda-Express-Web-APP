import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/styles.scss';
import MealOrder from "../components/MealOrder";
import ALCOrder from "../components/ALCOrder";
import DrinkOrder from "../components/DrinkOrder";
//import axios from 'axios'

/**
 * Allows a non-employee user to create an order.
 * @param {Array} cart - The current cart.
 * @param {Setter} setCart - The setter function for the current cart.
 * @author Joseph Quismorio
 */
export default function CreateOrder({ cart, setCart }){
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");

    if (id === 'bowl' || id === 'plate' || id === 'bigger-plate'){
      return (
        <MealOrder cart={cart} setCart={setCart}/>
      );
    }

    if (id === 'a-la-carte'){
      return (
        <ALCOrder cart={cart} setCart={setCart}/>
      );
    }

    if (id === 'drink'){
      return (
        <DrinkOrder cart={cart} setCart={setCart}/>
      );
    }
}
