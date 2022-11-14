import React, { Component, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardText, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import './productDetails.css'

const AddProduct = () => {

    const initialValues =  { 
        productName:"",
        productPrice:"",
        productCategory:"",
        productCondition:"",
        productBoughtYear:"",
        productDescription: "",  
        productlocation:"",

    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = event => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const handSubmit = event =>{
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    // useEffect(()=>{
    //     if(Object.keys(formErrors).length === 0 && isSubmit)
    //     {
    //         return <AddProductImage/>;
    //     }
    // },[formErrors]);

    const validate = (values) =>{
        const errors = {};
        if(!values.productName)
        {
            errors.productName = "Product name is required."
        }
        if(!values.productPrice)
        {
            errors.productPrice = "Product price is required."
        }
        if(!values.productCategory)
        {
            errors.productCategory = "Product category is required."
        }
        if(!values.productCondition)
        {
            errors.productCondition = "Product condition is required."
        }
        if(!values.productBoughtYear)
        {
            errors.productBoughtYear = "Product bought date is required."
        }
        if(!values.productlocation)
        {
            errors.productlocation = "Product location is required."
        }
        return errors;
    };

    // if(Object.keys(formErrors).length === 0 && isSubmit)
    // {
    //         return <AddProductImage prodDetail = {formValues}/>;
    // }
    
     if( Object.keys(formErrors).length === 0 && isSubmit )
     {
        console.log(JSON.stringify(formValues,undefined,2));
     }  
         
       
    return (
        
        <div className='prod'>
            <Card>
                <CardHeader>
                    Product Details
                </CardHeader>
                <CardBody>
                <Form onSubmit={handSubmit}>
                <FormGroup>
                    <Input type="text" id='productName' name='productName' placeholder="Product Name...."
                    value={formValues.productName}
                    onChange={handleChange}/>
                    <span>{formErrors.productName}</span>
                </FormGroup>
                <FormGroup>
                    <Input type='number' id='productPrice' name='productPrice' placeholder='Product Amount....' 
                    value={formValues.productPrice}
                    onChange={handleChange}/>
                    <span>{formErrors.productPrice}</span>
                </FormGroup>
                <FormGroup>
                    <Input type='select' id='productCategory' name='productCategory' 
                    value={formValues.productCategory}
                    onChange={handleChange}>
                        <option>Select Category</option>
                        <option>Technology & Electronics</option>
                        <option>Home</option>
                        <option>Garden</option>
                        <option>Hardware</option>
                        <option>Outdoor Adventure</option>
                        <option>Others</option>
                    </Input>
                    <span>{formErrors.productCategory}</span>
                </FormGroup>
                <FormGroup>
                    <Input type='select' id='productCondition' name='productCondition' 
                    value={formValues.productCondition}
                    onChange={handleChange}>
                        <option>Select Conditon</option>
                        <option>New</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Old</option>
                        <option>Refurbished</option>
                    </Input>
                    <span>{formErrors.productCondition}</span>
                </FormGroup>
                <FormGroup>
                    <Input type='date' id='productBoughtYear' name='productBoughtYear' placeholder='Bought Year...'
                    value={formValues.productBoughtYear}
                    onChange={handleChange}/>
                    <span>{formErrors.productBoughtYear}</span>
                </FormGroup>
                <FormGroup>
                     <Input id="productDescription" name="productDescription" type="textarea" placeholder='Product Description....'
                      value={formValues.productDescription}
                      onChange={handleChange}/>
                 </FormGroup>
                <FormGroup>
                    <Input type="text" id='productlocation' name='productlocation' placeholder="Location...."
                     value={formValues.productlocation}
                     onChange={handleChange}/>
                    <span>{formErrors.productlocation}</span>
                </FormGroup>
                <FormGroup>
                need product upload image functionalty here
                </FormGroup>
              
                <Button id='productSubmit' color='primary' type="submit">Submit</Button>
            </Form>
                </CardBody>
            </Card>
        </div>
      );
}

export default AddProduct;