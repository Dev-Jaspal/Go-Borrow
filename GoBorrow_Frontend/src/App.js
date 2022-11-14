import logo from './logo.svg';
import './App.css';
import SignUp from './components/signUp';
import AddProduct from './components/ProductDetails/productDetails';
import React, { Component } from 'react'
import EachProduct from './components/ProductDetails/eachProduct';
import Header from './components/header/header';
import RouteService from './services/routeService';
import Login from './components/login/login';

function App() {
  return (
    <div>
      <RouteService/>
    </div>
  );
}

export default App;
