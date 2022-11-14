import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userProducts.css';
import AuthService from '../../services/apiService';

const UserProducts = () => {

  const {http, user} = AuthService();
  const [products, setProducts] = useState();

  useEffect(()=>{
    http.get('/products')
    .then((res) => {
      console.log(res.data)
      setProducts(res.data);
    })
    .catch((err) => {console.log(err)})
  }, []);

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
        <div className="tab-content " id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-uploaded" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="card-deck p-3 mr-1 mt-2">
            {
              products.map((product, index)=>
                    product.userId === user._id &&
                          <Link key={index} className="card text-decoration-none mt-4  " to={"/productdetail/"+`${product._id}`}>
                          <div>
                            <img className="card-img-top" height={300} src={`${product.productImage}`} alt="Card image cap"/>
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

          <div className="tab-pane fade" id="nav-borrowed" role="tabpanel" aria-labelledby="nav-borrowed-tab">
          <div className="card-deck p-3 mr-1 mt-2">
          {
              products.map((product, index)=>
                    product.borrowedBy === user._id &&
                          <Link key={index} className="card text-decoration-none mt-4  " to={"/productdetail/"+`${product._id}`}>
                          <div>
                            <img className="card-img-top" height={300} src={`${product.productImage}`} alt="Card image cap"/>
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