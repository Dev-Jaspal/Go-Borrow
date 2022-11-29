import React, {useState} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import loginImg from '../../assets/images/login.jpg'
import { ProductValidation } from '../../utilities/validation';
import './registerProduct.css';
import AuthService from '../../services/apiService';
import { useEffect } from 'react';

const RegisterProduct = () => {
   const initialValue =  { 
      productName:"",
      productPrice:"",
      productCategory:"",
      productCondition:"",
      productBoughtYear:"",
      productDescription: "",  
      productlocation:"",
      productImage:""
  };


const {http, user} = AuthService();
const params = useParams();

  useEffect(() => {
    if(params.id)
    {
      http.get('/products?id='+params.id)
      .then((res)=>{
          setFormValue(res.data)
      })
      .catch(err=>{console.log(err)})
    }
    else
    {
      setFormValue(initialValue)
    }

  }, [params.id])


const [formValue, setFormValue] = useState(initialValue);
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);
const navigate = useNavigate();




const handleChange = event => {
    const {name, value} = event.target;
    setFormValue({...formValue, [name]: value});
   
};

const handleSubmit = event =>{
    event.preventDefault();
    setFormErrors(ProductValidation(formValue));
    setIsSubmit(true);
};

const convertToBase64 = (file) => {
   return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 };

const handleImage = async (e) =>{
   const file = e.target.files[0];
   const base64 = await convertToBase64(file);
   setFormValue({...formValue, productImage: base64});
}

  const handleCancel = (event) =>{
      event.preventDefault();
      setFormValue(initialValue)
      navigate('/');
  }
  
  if(Object.keys(formErrors).length === 0 && isSubmit) 
  {
    if(params.id)
    {
      http.put('/products/'+`${params.id}`,{  
        email:user.email,
        productName:formValue.productName,
        productPrice:formValue.productPrice,
        productCategory:formValue.productCategory,
        productCondition:formValue.productCondition,
        productBoughtYear:formValue.productBoughtYear,
        productDescription: formValue.productDescription,  
        productlocation:formValue.productlocation,
        productImage:formValue.productImage,
        // borrowedBy:""
    })
      .then((res) => {
          if(res.data)
          {
              setFormValue(initialValue);
              navigate('/userproducts');
          }
         
      })
      .catch((err) => {console.log(err)})
    }
    else
    {
      http
      .post('/products', 
                        {  
                          userId:user._id,
                          email:user.email,
                          productName:formValue.productName,
                          productPrice:formValue.productPrice,
                          productCategory:formValue.productCategory,
                          productCondition:formValue.productCondition,
                          productBoughtYear:formValue.productBoughtYear,
                          productDescription: formValue.productDescription,  
                          productlocation:formValue.productlocation,
                          productImage:formValue.productImage,
                          borrowedBy:""
                      }
      )
      .then((res) => {
            navigate('/');
      })
      .catch((err) => {console.log(err)})
    }
    
  }

  return ( 
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container mt-4">
      <div className="registerProd-card mt-5">
          <div className="row no-gutters">
          <div className="col-md-12 ">
              <div className="card-body ">
              <p className="registerProd-card-description">Add Product</p>
              <form className="registerProd-form w-100">
              <div className="form-group ">
                      <label htmlFor="productName" className="sr-only">Product Name</label>
                      <input type="text" id="productName" className="form-control" placeholder="Product Name"
                      name="productName" 
                      value={formValue.productName}
                      onChange={handleChange}/>
                      <span>{formErrors.productName}</span>
               </div>
               <div className="form-group ml-4 needZindex">
                      <label htmlFor="productPrice" className="sr-only">Product Price</label>
                      <input type="text" id="productPrice" className="form-control" placeholder="Product Price"
                      name="productPrice" 
                      value={formValue.productPrice}
                      onChange={handleChange}/>
                      <span>{formErrors.productPrice}</span>
               </div>
               <div className="form-group">
                  <select type='select' id='productCategory' 
                  name='productCategory' 
                  className="form-control"
                     value={formValue.productCategory}
                     onChange={handleChange}>
                           <option>Select Category</option>
                           <option value='Technology and Electronics'>Technology and Electronics</option>
                           <option value='Home'>Home</option>
                           <option value='Garden'>Garden</option>
                           <option value='Hardware'>Hardware</option>
                           <option value='Outdoor Adventure'>Outdoor Adventure</option>
                           <option value='Others'>Others</option>
                  </select>
                  <span>{formErrors.productCategory}</span>
               </div>
               <div className="form-group ml-4">
                      <label htmlFor="productBoughtYear" className="sr-only">Product Bought Year</label>
                      <input type='date' id='productBoughtYear' 
                      name='productBoughtYear' 
                      className="form-control"
                      placeholder='Bought Year...'
                    value={formValue.productBoughtYear}
                    onChange={handleChange}/>
                    <span>{formErrors.productBoughtYear}</span>
               </div>
               <div className="form-group">
                  <select type='select' id='productCondition' 
                  name='productCondition' 
                  className="form-control"
                    value={formValue.productCondition}
                    onChange={handleChange}>
                        <option>Select Conditon</option>
                        <option value='New'>New</option>
                        <option value='Good'>Good</option>
                        <option value='Fair'>Fair</option>
                        <option value='Old'>Old</option>
                        <option value='Refurbished'>Refurbished</option>
                  </select>
                  <span>{formErrors.productCondition}</span>
               </div>
               
               <div className="form-group ml-4">
                      <label htmlFor="productlocation" className="sr-only">Product Location</label>
                      <input type="text" id='productlocation' name='productlocation' 
                      className="form-control"
                      placeholder="Location...."
                     value={formValue.productlocation}
                     onChange={handleChange}/>
                    <span>{formErrors.productlocation}</span>
               </div>
               <div className="form-group textarea-frm">
                      <label htmlFor="productDescription" className="sr-only">Product Description</label>
                      <textarea id="productDescription" name="productDescription" height={10}
                      className="form-control"
                      placeholder='Product Description....'
                      value={formValue.productDescription}
                      onChange={handleChange}/>
                      <span>{formErrors.productDescription}</span>
               </div>
               <div className='form-group uploadBox'>
               <input type="file" id="myFile" className='ml-2' 
               name="productImage"
               onChange={handleImage}/>
               { formValue.productImage && <img src={`${formValue.productImage}`} className='float-right'/>}
               </div>
               <div className="registerProd-buttons">
                  <input name="register" id="register" className="btn btn-inline-block btn-secondary mb-4" type="button" value="Cancel"
                   onClick={handleCancel}/>
                  <input name="register" id="register" className="btn btn-inline-block btn-success mb-4 ml-2" type="button" value={params.id ? "Update Product" : "Register Product"}
                   onClick={handleSubmit}/>
               </div>
              </form>
              </div>
          </div>
          </div>
      </div>
      </div>
  </main>
     );
}
 
export default RegisterProduct;