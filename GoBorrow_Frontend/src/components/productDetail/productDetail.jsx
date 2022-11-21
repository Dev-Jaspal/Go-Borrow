import React, { useEffect, useState } from 'react';
import './productDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/apiService';

const ProductDetail = () => {

const navigate = useNavigate();
const params = useParams();
const {http, user} = AuthService();
const [prodDetail, setProdDetails] = useState({});

useEffect(()=>{
    http.get('/products?id='+params.id)
    .then((res)=>{
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
                navigate('/');
            }
     })
}
    return ( 
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container mt-5">
        <div className="prodDetail-card mt-3 p-3">
        <h3 className="p-2 mb-4"><strong>{prodDetail.productName}</strong></h3>
            <div className="d-flex">
            <div className="col-md-4 p-0 ">
                <img src={`${prodDetail.productImage}`} alt="prodDetail" className="prodDetail-card-img border p-5"/>
            </div>
            <div className="col-md-8">
                <div className="px-3 pt-0">
                    <form className='mt-3'>
                        <div className="mb-1">
                            <label ><strong>Product Owner:</strong> {prodDetail.ownerName}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Contact:</strong> {prodDetail.ownerEmail}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Price:</strong> ${prodDetail.productPrice}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Condition: </strong>{prodDetail.productCondition}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Category: </strong>{prodDetail.productCategory}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Bought Year:</strong> {prodDetail.productBoughtYear}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Location:</strong>{prodDetail.productlocation}</label>
                        </div>
                    </form>
                </div>
            </div>
            
            </div>
            <div className="mt-2">
                    <p>{prodDetail.productDescription}</p>
            </div>
            {
                   ( user._id !== prodDetail.userId && prodDetail.borrowedBy !== user._id) 
                   && 
                    <div className="mt-2 float-right mr-4">
                        <input name="register" id="register" className="btn btn-inline-block btn-secondary mb-4" type="button" value="Cancel"
                        onClick={handleCancel}/>
                        <input name="register" id="register" className="btn btn-inline-block btn-success mb-4 ml-2" type="button" value="Borrow"
                        onClick={handleSubmit}/>
                    </div>
            }
        </div>
        </div>
    </main>
     );
}
 
export default ProductDetail;