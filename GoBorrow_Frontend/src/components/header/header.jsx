import React from 'react';
import {Link} from 'react-router-dom';
import avatar  from '../../assets/images/img_avatar.png';
import AuthService from '../../services/apiService';

const Header = () => {

    const {getUser, logout} = AuthService();

    const handleLogout =()=>
    {
       if(getUser()){
        logout();
       }
    }
    
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning bold"  to="/">GoBorrow</Link>
                <ul className="navbar-nav float-left" style={{flexGrow: 1}}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/productregister">Register Product</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/userproducts">Your Products</Link>
                    </li>
                    <li className="nav-item">
                    {
                        getUser().role === 'Admin' && <Link className="nav-link" to="/admin">Registered User</Link>
                    }
                    </li>
                </ul>
                
                <div className="dropdown dropstart">
                    <img src={avatar} alt="Logo" style={{width:40}} className="rounded-pill dropdown-toggle" data-toggle="dropdown"/>
                    <ul className="dropdown-menu top-100" style={{left:"-110px"}}>
                        <li><Link className="dropdown-item" to="/profile">{getUser().name}</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </nav> 
  );
}

export default Header;