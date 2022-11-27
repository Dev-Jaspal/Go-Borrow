import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './userProducts.css';
import AuthService from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faLocationPin } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";


const UserProducts = () => {

  const {http, user} = AuthService();
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [alert, setAlert] = useState(null);

  const hideAlert = () => {
      setAlert(null);
    };


  const handleDelete = (product)=> {
    setAlert(
      <SweetAlert
      warning
      style={{ display: "block", margin: "0" }}
      title="Are you sure!!"
      onConfirm={() => deleteProduct(product)}
      onCancel={() => hideAlert()}
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="light"
      btnSize=""
      focusCancelBtn
      >
       Do you want to delete {product.productName} </SweetAlert>
  )
    
  }

  const deleteProduct = (product) =>{
    http.delete('/products/'+product._id)
    .then((res)=>{
      navigate('/')
    })
    .catch(err=> console.log(err))
  }

  useEffect(()=>{
    if(params.id)
    {
      http.get('/products/' + params.id)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {console.log(err)})
    }
    else
    {
      http.get('/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {console.log(err)})
    }
  }, [params.id]);

if(products === undefined){
  return <div>Loading.....</div>
}

    return ( 
      <div className='container-fluid position-relative'>
      <nav >
        <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{marginTop: "6rem", marginLeft: "1rem", marginRight: "2rem"}}>
          <a className="nav-item nav-link active" id="nav-uploaded-tab" data-toggle="tab" 
            href="#nav-uploaded" role="tab"
            aria-controls="nav-home" aria-selected="true">Uploaded</a>
          <a className="nav-item nav-link" id="nav-borrowed-tab" data-toggle="tab" 
            href="#nav-borrowed" role="tab" 
            aria-controls="nav-borrowed" aria-selected="false">Borrowed</a>
        </div>
      </nav>
       {alert}
        <div className="tab-content " id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-uploaded" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="card-deck p-3 mr-1 mt-2">
            {
              products.map((product, index)=>
                    (product.userId === user._id || product.userId === params.id)
                         &&
                          <div className='card mt-4'>
                            <Link key={index} className="text-decoration-none " to={"/productregister/"+`${product._id}`}>
                            <img className="card-img-top p-3" height={300} src={`${product.productImage}`} alt="product image...."/>
                            </Link>
                            <div className="card-body d-flex">
                              <div className="flex-grow-1">
                              <h3 className="card-text text-dark">{product.productName}</h3>
                              <p className="card-text mb-2 text-muted"><small className="text-muted"> <FontAwesomeIcon icon={faLocationPin} className="primary mr-2"/>{product.productlocation}</small></p>
                              <p className="card-text mb-3 text-muted"><small className="text-muted productdesc">{product.productDescription}</small></p>
                              <p className="card-text mb-3 text-muted"><small className="text-dark"><strong>Pay: </strong>${product.productPrice} per day</small></p>
                              </div>
                              <FontAwesomeIcon onClick={() => handleDelete(product)} icon={faTrash} className="float-end fa-trash"/>
                            </div>
                          </div>
                         
              )
            }
          </div>
          </div>

          <div className="tab-pane fade" id="nav-borrowed" role="tabpanel" aria-labelledby="nav-borrowed-tab">
          <div className="card-deck p-3 mr-1 mt-2">
          {
              products.map((product, index)=>
                    (product.borrowedBy === user._id || product.borrowedBy === params.id)
                     &&
                          <Link key={index} className="card text-decoration-none mt-4" to={"/productdetail/"+`${product._id}`}>
                          <div>
                            <img className="card-img-top p-3" height={300} src={`${product.productImage}`} alt="Card image cap"/>
                            <div className="card-body">
                              <p className="card-text text-muted">{product.productName}</p>
                              <p className="card-text mb-0 text-muted"><small className="text-muted">{product.productlocation}</small></p>
                              <p className="card-text mb-3 text-muted"><small className="text-muted">Pay: ${product.productPrice} per day</small></p>
                            </div>
                          </div>
                          </Link>
              )
            }
          </div>
          </div>
        </div>
       </div>
     );
}
 
export default UserProducts;