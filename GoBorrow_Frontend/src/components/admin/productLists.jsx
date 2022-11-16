// import React from 'react';
// import './productLists.css';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import allProducts from '../../services/allProducts'
// import { useState } from 'react';
// import { FaTrash } from 'react-icons/fa'

// const ProductLists = () => {
//     const {userName} = useParams();
//     const [products, setProducts] = useState(allProducts);
//     const navigate = useNavigate();

//     const editHandler = (userId) => {
//       <Link to={`/editproducts/${userId}/${userName}`}></Link>
//       navigate(`/editproducts/${userId}/${userName}`, {replace:true})
//     }

//     return ( 
//         <>
//         <div className='container-fluid position-relative'>
//         <nav>
//           <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{marginTop: "6rem", marginLeft: "1rem", marginRight: "2rem"}}>
//             <a className="nav-item nav-link active" id="nav-uploaded-tab" data-toggle="tab" 
//               href="#nav-uploaded" role="tab"
//               aria-controls="nav-home" aria-selected="true">Uploaded</a>
//             <a className="nav-item nav-link" id="nav-borrowed-tab" data-toggle="tab" 
//               href="#nav-borrowed" role="tab" 
//               aria-controls="nav-borrowed" aria-selected="false">Borrowed</a>
//           </div>
//         </nav>
//           <div className="tab-content " id="nav-tabContent">
//             <div className="tab-pane fade show active" id="nav-uploaded" role="tabpanel" aria-labelledby="nav-home-tab">
//               <div className="card-deck p-3 mr-1 mt-2">
//               {products.filter((user, idx) => user.username === userName && user.status === "Uploaded").map((product, idx)=>
//                   <div className="card text-decoration-none mt-4" onClick={()=>editHandler(product.id)}>
//                     <img className="card-img-top" src={("https://a0.muscache.com/im/pictures/c96ca7bd-3f0b-4d65-99ae-5fbcf409868e.jpg?im_w=1200")} alt="Card image cap" />
//                     <div className="card-body">
//                       <p className="card-text text-muted">{product.item}</p>
//                       <p className="card-text mb-0 text-muted"><small className="text-muted">{product.location}</small></p>
//                       <p className="card-text mb-3 text-muted"><small className="text-muted">Pay: ${product.price} per day</small></p>
//                       <FaTrash className='d-inline' />
//                     </div>
//                   </div>
//                 )
//               }
//             </div>
//             </div>

//             <div className="tab-pane fade" id="nav-borrowed" role="tabpanel" aria-labelledby="nav-borrowed-tab">
//             <div className="card-deck p-3 mr-1 mt-2">
//             {products.filter((user, idx) => user.username === userName && user.status === "Borrowed").map((product, idx)=>
//                   <div className="card text-decoration-none mt-4" onClick={()=>editHandler(product.id)}>
//                     <img className="card-img-top" src={("https://a0.muscache.com/im/pictures/c96ca7bd-3f0b-4d65-99ae-5fbcf409868e.jpg?im_w=1200")} alt="Card image cap" />
//                     <div className="card-body">
//                       <p className="card-text text-muted">{product.item}</p>
//                       <p className="card-text mb-0 text-muted"><small className="text-muted">{product.location}</small></p>
//                       <p className="card-text mb-3 text-muted"><small className="text-muted">Pay: ${product.price} per day</small></p>
//                       <FaTrash className='d-inline' />
//                     </div>
//                   </div>
//                 )
//               }
//             </div>
//             </div>
//           </div>
//          </div>
//      </>);
// }
 
// export default ProductLists;