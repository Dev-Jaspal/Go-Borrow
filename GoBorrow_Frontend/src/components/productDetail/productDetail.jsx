import React, { useEffect, useState } from 'react';
import axios from "axios";
import './productDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/apiService';
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {

const navigate = useNavigate();
const params = useParams();
const {http, translate, user} = AuthService();
const [prodDetail, setProdDetails] = useState({});
const [alert, setAlert] = useState(null);
const [language, setLanguage] = useState("French");
const [productDescription, setProductDescription] = useState('');
const [productCategory, setProductCategory] = useState('');
const [productCondition, setProductCondition] = useState('');

const hideAlert = () => {
    setAlert(null);
  };

const changeDescToFrench = () =>{
    translate.post(`/translate`,{
        q : `${prodDetail.productDescription}`,
        source: "en",
        target: "fr"
    } )
    .then((response) => {
        setProductDescription(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}

const changeCatToFrench = () =>{
    translate.post(`/translate`,{
        q : `${prodDetail.productCategory}`,
        source: "en",
        target: "fr"
    } )
    .then((response) => {
        setProductCategory(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}

const changeCodToFrench = () =>{
    translate.post(`/translate`,{
        q : `${prodDetail.productCondition}`,
        source: "en",
        target: "fr"
    } )
    .then((response) => {
        setProductCondition(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}


const changeDescToEnglish = () =>{
    translate.post(`/translate`, {
        q : `${prodDetail.productDescription}`,
        source: "fr",
        target: "en"
    })
    .then((response) => {
        setProductDescription(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}

const changeCatToEnglish = () =>{
    translate.post(`/translate`, {
        q : `${prodDetail.productCategory}`,
        source: "fr",
        target: "en"
    })
    .then((response) => {
        setProductCategory(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}

const changeCodToEnglish = () =>{
    translate.post(`/translate`, {
        q : `${prodDetail.productCondition}`,
        source: "fr",
        target: "en"
    })
    .then((response) => {
        setProductCondition(response.data.translatedText)
    })
    .catch(err => console.log(err.message));
}


const handleLanguage = async (prodDetail) =>{
    if(language === 'English')
    {
        setLanguage('French');
        changeDescToEnglish();
        changeCatToEnglish();
        changeCodToEnglish();
        // changeLocToEnglish();
    }
    else
    {
        setLanguage('English');
        changeDescToFrench();
        changeCatToFrench();
        changeCodToFrench();
        // changeLocToFrench();
    }
}

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
                setAlert(
                    <SweetAlert
                    success
                    style={{ display: "block", margin: "0" }}
                    title="Please contact to owner for further process."
                    onConfirm={() => {hideAlert(); navigate('/');}}
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    btnSize=""
                    timeout={3000}
                    >
                    You have borrow {prodDetail.productName} </SweetAlert>
                )
                
            }
     })
}
   
    return ( 
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        {alert}
        <div className="container mt-5">
        <div className="prodDetail-card mt-3 p-3">
        <a href='#' className='p-2 float-right text-decoration-none text-warning' onClick={() => handleLanguage(prodDetail)}><FontAwesomeIcon  icon={faGlobe} className='mr-2' /><strong>{language}</strong></a>
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
                            <label><strong>Product Condition: </strong>{ productCategory === '' ? prodDetail.productCondition : productCondition}</label>
                        </div>
                        <div className="mb-1">
                            <label><strong>Product Category: </strong>{ productCondition === '' ?  prodDetail.productCategory : productCategory}</label>
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
                    {
                        productDescription === ''?
                        <p>{prodDetail.productDescription}</p>
                        :
                        <p>{productDescription}</p>
                    }
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