import React from 'react';
import './productDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/apiService';
import { useEffect } from 'react';
import { useState } from 'react';
const ProductDetail = () => {

const navigate = useNavigate();
const params = useParams();
const {http, user} = AuthService();
const [prodDetail, setProdDetails] = useState({});

useEffect(()=>{
    http.get('/products?id='+params.id)
    .then((res)=>{
        console.log(res.data)
        setProdDetails(res.data)
    })
    .catch(err=>{console.log(err)})
}, []);

const handleCancel = (event) =>{
    navigate('/');
}

const handleSubmit = (event) =>{
    event.preventDefault();
    http.put('/products/'+params.id, {borrowedBy: user._id})
     .then((res) =>{
            if(res.data)
            {
                console.log(res.data)
                navigate('/');
                //Initiate Email to owner and borrower
            }
     })
}
    return ( 
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
        <div className="prodDetail-card">
            <div className="row no-gutters">
            <div className="col-md-5">
                <img src={`${prodDetail.productImage}`} alt="prodDetail" className="prodDetail-card-img"/>
            </div>
            <div className="col-md-7">
                <div className="card-body">
                <p className="prodDetail-card-description">Product Detail</p>
                <form>
                <div className="form-group">
                    <label htmlFor="name" >Product Owner: {prodDetail.ownerName}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Contact: {prodDetail.ownerEmail}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Name: {prodDetail.productName}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Price: ${prodDetail.productPrice}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Condition: {prodDetail.productCondition}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Category: {prodDetail.productCategory}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Bought Year: {prodDetail.productBoughtYear}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Location: {prodDetail.productlocation}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="name" >Product Description: {prodDetail.productDescription}</label>
                </div>
                {
                   ( user._id !== prodDetail.userId && prodDetail.borrowedBy !== user._id) &&  <>
                    <input name="register" id="register" className="btn btn-inline-block btn-secondary mb-4" type="button" value="Cancel"
                    onClick={handleCancel}/>
                     <input name="register" id="register" className="btn btn-inline-block btn-success mb-4 ml-2" type="button" value="Borrow"
                    onClick={handleSubmit}/>
                    </>
                }
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </main>
     );
}
 
export default ProductDetail;