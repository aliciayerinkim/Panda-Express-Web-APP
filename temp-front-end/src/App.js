import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import UserLogin from "./pages/UserLogin";
import EmployeeLogin from "./pages/EmployeeLogin";

import Dashboard from "./pages/Dashboard";

import Order from "./pages/Order";
import CreateOrder from "./pages/CreateOrder";
import CreateOrderEmployee from "./pages/CreateOrderEmployee";
import CheckoutEmployee from "./pages/CheckoutEmployee";
import Checkout from "./pages/Checkout";

import Reports from "./pages/Reports";

import EditMenuItem from "./pages/EditMenuItem";
import ManagerDashboard from "./pages/ManagerDashboard";
import InventoryOrder from "./pages/InventoryOrder";
import EditMenuPrice from "./pages/EditMenuPrice";
import EditInventoryPrice from "./pages/EditInventoryPrice";
import DeleteMenuItem from "./pages/DeleteMenuItem";
import DeleteInventoryItem from "./pages/DeleteInventoryItem";
import AddMenuItem from "./pages/AddMenuItem";
import AddInventoryItem from "./pages/AddInventoryItem";
import ViewInventory from './pages/ViewInventory';
import OrderConfirmation from './pages/OrderConfirmation';

export default function App () {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    const localIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    const localIsManager = JSON.parse(localStorage.getItem('isManager') || 'false');
    const localOrderInProgress = JSON.parse(localStorage.getItem('orderInProgress') || '[]');

    const [cart, setCart] = useState(localCart);
    const [user, setUser] = useState(localUser);
    const [isLoggedIn, setIsLoggedIn] = useState(localIsLoggedIn);
    const [isManager, setIsManager] = useState(localIsManager);
    const [orderInProgress, setOrderInProgress] = useState(localOrderInProgress);
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn])

    useEffect(() => {
        localStorage.setItem("isManager", JSON.stringify(isManager));
    }, [isManager])

    useEffect(() => {
        localStorage.setItem("orderInProgress", JSON.stringify(orderInProgress));
    }, [orderInProgress])


    return(
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<UserLogin user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="login-employee" element={<EmployeeLogin setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager} />} />

        <Route path="order" element={<Order />} />
        <Route path="/order/create-order" element={<CreateOrder cart={cart} setCart={setCart}/>} />
        <Route path="/order/checkout" element={<Checkout cart={cart} setCart={setCart} orderInProgress={orderInProgress} setOrderInProgress={setOrderInProgress}/>} />
        <Route path="/order/order-confirmation" element={<OrderConfirmation orderInProgress={orderInProgress} setOrderInProgress={setOrderInProgress}/>} />

        <Route path="dashboard" element={<Dashboard setCart={setCart} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager}/>} />
        <Route path="/dashboard/create-order" element={<CreateOrderEmployee cart={cart} setCart={setCart}/>} />
        <Route path="/dashboard/checkout" element={<CheckoutEmployee cart={cart} setCart={setCart}/>} />

        <Route path="manager-dashboard" element={<ManagerDashboard setCart={setCart} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsManager={setIsManager}/>} />

        <Route path="manager-dashboard/edit-menu-item" element={<EditMenuItem />} />
        <Route path="manager-dashboard/edit-menu-item/add-menu-item" element={<AddMenuItem />} />
        <Route path="manager-dashboard/edit-menu-item/delete-menu-item" element={<DeleteMenuItem   />} />
        <Route path="manager-dashboard/edit-price/edit-menu-price" element={<EditMenuPrice />} />

        <Route path="manager-dashboard/view-inventory/add-inventory-item" element={<AddInventoryItem   />} />
        <Route path="manager-dashboard/view-inventory/delete-inventory-item" element={<DeleteInventoryItem   />} />
        <Route path="manager-dashboard/view-inventory/edit-inventory-price" element={<EditInventoryPrice />} />
        <Route path="manager-dashboard/order-inventory" element={<InventoryOrder />} />
        <Route path="manager-dashboard/view-inventory" element={<ViewInventory   />} />

        <Route path="manager-dashboard/reports" element={<Reports />} />
        </Routes>
    </Router>
    );
}
