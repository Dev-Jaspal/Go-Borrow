import React, { useEffect, useState }  from 'react';
import './products.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
 
 
  const {http} = AuthService();
  const [products, setProducts] = useState();

  useEffect(()=>{
    http.get('/products')
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {console.log(err)})
  }, []);

if(products === undefined){
  return <div>Loading.....</div>
}
return ( 
    <div className="card-deck p-3 mr-1 mt-5">
    {
      products.map((product, index)=>
            product.borrowedBy === "" &&
                  <Link key={index} className="card text-decoration-none mt-4  " to={"/productdetail/"+`${product._id}`}>
                  <div>
                            <img className="card-img-top p-3" height={300} src={`${product.productImage}`} alt="Card image cap"/>
                            <div className="card-body d-flex">
                              <div className="flex-grow-1">
                              <h3 className="card-text text-dark">{product.productName}</h3>
                              <p className="card-text mb-2 text-muted"><small className="text-muted"> <FontAwesomeIcon icon={faLocationPin} className="primary mr-2"/>{product.productlocation}</small></p>
                              <p className="card-text mb-3 text-muted"><small className="text-muted productdesc">{product.productDescription}</small></p>
                              <p className="card-text mb-3 text-muted"><small className="text-dark"><strong>Pay: </strong>${product.productPrice} per day</small></p>
                              </div>
                            </div>
                          </div>
                  </Link>
      )
    }
   </div> 
     );
}
 
export default Products;