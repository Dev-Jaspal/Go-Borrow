import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImg from '../../assets/images/login.jpg'
import { RegisterationValidation } from '../../utilities/validation';
import './profile.css';
import AuthService from '../../services/apiService';

const Profile = () => {
    const {http, user, storeUser} = AuthService();

    const initialValue = {
        name:"",
        email: user.email,
        password:"",
        confirmPassword: "",
    };

  
    const [registerForm, setRegisterForm] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) =>{
        event.preventDefault();
        const {name, value} = event.target;
        setRegisterForm({...registerForm,[name]:value});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setFormErrors(RegisterationValidation(registerForm));
        setIsSubmit(true);
    }

    const handleCancel = (event) =>{
        event.preventDefault();
        setRegisterForm(initialValue)
        navigate('/');
    }
    
    if(Object.keys(formErrors).length === 0 && isSubmit) 
    {
        http.put('/users/'+`${user._id}`,{name:registerForm.name, password:registerForm.password})
        .then((res) => {
            if(res.data)
            {
                storeUser(res.data);
                setRegisterForm(initialValue);
                navigate('/');
            }
           
        })
        .catch((err) => {console.log(err)})
    }

    return (  
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
        <div className="registeration-card">
            <div className="row no-gutters">
            <div className="col-md-5">
                <img src={loginImg} alt="registeration" className="registeration-card-img"/>
            </div>
            <div className="col-md-7">
                <div className="card-body">
                <p className="registeration-card-description">Profile</p>
                <form>
                <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="Email address"
                        disabled
                        name="email" 
                        value={registerForm.email}
                        onChange={handleChange}/>
                        <span>{formErrors.email}</span>
                </div>
                <div className="form-group">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Name"
                        name="name" 
                        value={registerForm.name}
                        onChange={handleChange}/>
                        <span>{formErrors.name}</span>
                    </div>
                   
                    <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password"
                        name="password" 
                        value={registerForm.password}
                        onChange={handleChange}/>
                         <span>{formErrors.password}</span>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="confirmPassword" className="sr-only">Password</label>
                        <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password"
                        name="confirmPassword" 
                        value={registerForm.confirmPassword}
                        onChange={handleChange}/>
                         <span>{formErrors.confirmPassword}</span>
                    </div>
                    <input name="register" id="register" className="btn btn-inline-block btn-secondary mb-4" type="button" value="Cancel"
                     onClick={handleCancel}/>
                    <input name="register" id="register" className="btn btn-inline-block btn-success mb-4 ml-2" type="button" value="Update"
                     onClick={handleSubmit}/>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </main>
    );
}
 
export default Profile;