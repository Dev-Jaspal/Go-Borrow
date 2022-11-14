import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
    const navigate = useNavigate();
    
    const getUser = () =>{
        const user =  sessionStorage.getItem('user');
        const user_detail =  JSON.parse(user);
        return user_detail;
    };

    const storeUser = (user) =>{
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/');
    };
    const [user, setUser] = useState(getUser());

    const logout = () =>{
        sessionStorage.clear();
        navigate('/login');
    };

    const http = axios.create({
        baseURL:"http://localhost:5000/api",
        headers:{
            // "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
        }
    });
    return{
        storeUser,
        getUser,
        user,
        logout,
        http
    }
}
 
export default AuthService;