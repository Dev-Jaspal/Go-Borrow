import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import {allUsers} from '../../services/allUsers'
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom';
import ProductDetail from '../productDetail/productDetail';
import EditProduct from './editProducts';
import {FaTrash} from 'react-icons/fa'
import AuthService from '../../services/apiService';

const Admin = ({navigation}) => {
    const [data, setData] = useState(allUsers);
    const [popUp, setPopUP] = useState(false);
    const navigate = useNavigate();
    const {http, user} = AuthService();
    const [users, setUsers] = useState();
  
    useEffect(()=>{
      http.get('/users')
      .then((res) => {
        console.log(res.data)
        setUsers(res.data);
      })
      .catch((err) => {console.log(err)})
    }, []);
    if(users === undefined){
        return <div>Loading.....</div>
      }

    const togglePopUp = () => {
        setPopUP(!popUp);
    }

    const viewHandler = (id) => {
        // <Link to={`/userproducts/${id}`}></Link>
        navigate(`/userproducts/${id}`)
    }

    const userDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you want to delete this user?")){
            console.log("deleted");
        }
    }



    // const columns = [
    //     {
    //         name: "Id",
    //         selector: "id",
    //         sortable: true
    //     },
    //     {
    //         name: "Email",
    //         selector: "email",
    //         sortable: true
    //     },
    //     {
    //         name: "Username",
    //         selector: "username",
    //         sortable: true,
    //         right: true
    //     },
    //     {
    //         name: "All Products",
    //         button: true,
    //         cell: (row) => (
    //             <button
    //                 className="btn btn-outline btn-xs"
    //                 onClick={()=>componentChange(row.id)}> View
    //             </button>
    //         )
    //     },
    //     {
    //         name: "User Delete",
    //         button: true,
    //         cell: (row) => (
    //             <button
    //                 className="btn btn-outline btn-xs"
    //                 onClick={()=>userDelete(row.id)}> Delete
    //             </button>
    //         )
    //     }
    // ]

    return ( <>
    
    <div className="p-5">

        {/* <div className='users'>
            <DataTable 
                title="Users"
                columns={columns}
                data={data}
                defaultSortField="title"
                pagination
            />
        </div>
        <h1>hi {users[0].name}
        
            {(users === undefined) && (
                 <div>Loading.....</div>
            )}
            {users.map((u,idx)=>{
            <p key={idx}>{u.name}</p>
        })}
        </h1> */}
        

         <table className="table">
            <thead>
                <tr>
                    <th>Users</th>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Action</th>
                    <th>All Products</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, idx)=>
                    <tr key={idx}>
                        <th></th>
                        <th>{idx+1}</th>
                        <th>{user.email}</th>
                        <th>{user.name}</th>
                        <th><FaTrash /></th>
                        <th><button onClick={()=>viewHandler(user._id)}>View</button></th>
                    </tr>
                )}
            </tbody>
         </table>
   
    
     </div> 
    </>);
}
 
export default Admin;