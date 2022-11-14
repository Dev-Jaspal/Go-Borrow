import React , {useState} from 'react';
import {Routes,Route, Navigate} from 'react-router-dom'
import ForgetPassword from '../components/forgetPassword/forgetPassword';
import Login from '../components/login/login';
import Logout from '../components/logout/logout';
import Products from '../components/products/products';
import Register from '../components/register/register';
import RegisterProduct from '../components/registerProduct/registerProduct';
import Header from '../components/header/header';
import Profile from '../components/profile/profile';
import UserProducts from '../components/userProducts/userProducts';
import ProductDetail from '../components/productDetail/productDetail';
import Admin from '../components/admin/admin';
import EditProduct from '../components/admin/editProduct'
import AuthService from './apiService';

const RouteService = () => {

    const {http, getUser} = AuthService();
    if(getUser())
    {
        return ( 
            <>
            <Header/>
            <Routes>
                <Route path='/productregister' element={<RegisterProduct/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/productdetail/:id' element={<ProductDetail/>}/>
                <Route path='/userproducts' element={<UserProducts/>}/>
                <Route path='/profile' element={<Profile/>}/>
                {/* <Route path='/logout' element={<Logout/>}/> */}
                <Route path='/admin' element={<Admin />}/>
                <Route path='/editproduct/:userName' element={<EditProduct />}/>
                {/* <Route path='/profile/:Id' element={<Profile/>}/> */}
                <Route path='/' element={<Products/>}/>
                <Route path='*' element={<Login/>}/>
            </Routes>
            </>
         );
    }
    else{
        return ( 
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/forgetPassword' element={<ForgetPassword/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Login/>}/>
            </Routes>
         );
    }
}
 
export default RouteService;