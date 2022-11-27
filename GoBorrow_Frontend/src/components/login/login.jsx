import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/images/login.jpg'
import AuthService from '../../services/apiService';
import { LoginValidation } from '../../utilities/validation';
import './login.css';

const Login = () => {
    const {http, storeUser} = AuthService();
   
    const initialValue = {
        email:"",
        password:""
    };

    
    const [loginForm, setLoginForm] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isExistErr, setIsExistErr] = useState("");

    const handleChange = (event) =>{
        event.preventDefault();
        const {name, value} = event.target;
        setLoginForm({...loginForm,[name]:value});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setFormErrors(LoginValidation(loginForm));
        setIsSubmit(true);
    }

    if(Object.keys(formErrors).length === 0 && isSubmit) 
    {
        http.post('/user/login',{email: loginForm.email, password:loginForm.password})
        .then((res) => {
            storeUser(res.data);
        })
        .catch((err) => {
            setIsExistErr(err.response.data.message);
        })
    }

    return ( 
        <>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="login-card">
                    <div className="row no-gutters">
                    <div className="col-md-5">
                        <img src={loginImg} alt="login" className="login-card-img"/>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                        <p className="login-card-description">Sign into your account</p>
                        
                        <form>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" id="email" className="form-control" placeholder="Email address"
                                name="email" 
                                value={loginForm.email}
                                onChange={handleChange}/>
                                <span>{formErrors.email}</span>
                                {isExistErr && <span className='text-danger p-1 m-0'>{isExistErr}</span>}
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input type="password" id="password" className="form-control" placeholder="***********"
                                name="password" 
                                value={loginForm.password}
                                onChange={handleChange}/>
                                <span>{formErrors.password}</span>
                            </div>
                            <input name="login" id="login" className="btn btn-block login-btn mb-4" type="button" value="Login"
                            onClick={handleSubmit}/>
                            </form>
                            <Link to="/forgetPassword" className="forgot-password-link" >Forgot password?</Link>
                            <p className="login-card-footer-text">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
        </>
     );
}
 
export default Login;