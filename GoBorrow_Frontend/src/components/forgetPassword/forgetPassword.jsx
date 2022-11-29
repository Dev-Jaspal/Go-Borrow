import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { ForgetPasswordValidation } from '../../utilities/validation';
import loginImg from '../../assets/images/login.jpg'
import './forgetPassword.css';
import AuthService from '../../services/apiService';

const ForgetPassword = () => {
    const initialForgetPwdValue = {
        email:"",
        forgetPassword:"",
        forgetConfirmPassword: "",
    };

    const {http} = AuthService();
    const [forgetPasswordForm, setForgetPasswordForm] = useState(initialForgetPwdValue);
    const [formErrors, setFormErrors] = useState({});
    const [isForgetSubmit, setIsForgetSubmit] = useState(false);

    const navigate = useNavigate();

    const handleForgetChange = (event) =>{
        event.preventDefault();
        const {name, value} = event.target;
        setForgetPasswordForm({...forgetPasswordForm,[name]:value});
    }

    const handleForgetSubmit = (event) =>{
        event.preventDefault();
        setFormErrors(ForgetPasswordValidation(forgetPasswordForm));
        setIsForgetSubmit(true);
    }

    const handleCancel = (event) =>{
        event.preventDefault();
        setForgetPasswordForm(initialForgetPwdValue)
        navigate('/');
    }
    
    if(Object.keys(formErrors).length === 0 && isForgetSubmit) 
    {
        http.put('/users/forgetpwd/'+`${forgetPasswordForm.email}`,{password:forgetPasswordForm.forgetPassword})
        .then((res) => {
            if(res.data)
            {
                setForgetPasswordForm(initialForgetPwdValue)
                navigate('/');
            }
           
        })
        .catch((err) => {console.log(err)})
    }


    return ( 
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
            <div className="forgetPwd-card">
                <div className="row no-gutters">
                <div className="col-md-5">
                    <img src={loginImg} alt="forgetPwd" className="forgetPwd-card-img"/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                    <p className="forgetPwd-card-description">Forget Password</p>
                    <form>
                        <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" id="email" className="form-control" placeholder="Email address"
                                name="email" 
                                value={forgetPasswordForm.email}
                                onChange={handleForgetChange}/>
                                <span>{formErrors.email}</span>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="passwordF" className="sr-only">Password</label>
                            <input type="password" id="passwordF" className="form-control" placeholder="Password"
                            name="forgetPassword" 
                            value={forgetPasswordForm.forgetPassword}
                            onChange={handleForgetChange}/>
                            <span>{formErrors.forgetPassword}</span>
                        </div>
                            <div className="form-group mb-4">
                            <label htmlFor="confirmPasswordF" className="sr-only">Password</label>
                            <input type="password" id="confirmPasswordF" className="form-control" placeholder="Confirm Password"
                            name="forgetConfirmPassword" 
                            value={forgetPasswordForm.forgetConfirmPassword}
                            onChange={handleForgetChange}/>
                            <span>{formErrors.forgetConfirmPassword}</span>
                        </div>
                        <input name="forgetPwdCancel" id="forgetPwdCancel" className="btn btn-inline btn-secondary mb-4 w-25" type="button" value="Cancel"
                        onClick={handleCancel}/>
                        <input name="forgetPwdSave" id="forgetPwdSave" className="btn btn-success btn-inline  mb-4 ml-2 w-25" type="button" value="Save"
                        onClick={handleForgetSubmit}/>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </main>
     );
}
 
export default ForgetPassword;