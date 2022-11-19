import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";

const Admin = ({navigation}) => {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const {http, user} = AuthService();
    const [users, setUsers] = useState();

    const hideAlert = () => {
        setAlert(null);
      };

    const getUsers = () =>{
    http.get('/users')
      .then((res) => {
        var usersData = res.data.filter(x => x.role !== 'Admin')
        setUsers(usersData);
      })
      .catch((err) => {console.log(err)})
    }
    useEffect(()=>{
        getUsers();
    }, []);

    const handleDelete = (row) => {
        setAlert(
            <SweetAlert
            warning
            style={{ display: "block", margin: "0" }}
            title="Are you sure!!"
            onConfirm={() => deleteUser(row)}
            onCancel={() => hideAlert()}
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="light"
            btnSize=""
            focusCancelBtn
            >
             Do you want to delete {row.name} </SweetAlert>
        )
    }

    const deleteUser = (row) =>{
        http.delete('/users/'+row._id)
        .then((res)=>{
          hideAlert()
          getUsers();
        })
        .catch(err=> console.log(err))
    }

    const handleDetails = (row) =>{
       navigate('/userproducts/'+row._id)
    }
    const columns = [
        {
            name: "Id",
            selector: "_id",
            sortable: true
        },
        {
            name: "Email",
            selector: "email",
            sortable: true
        },
        {
            name: "Username",
            selector: "name",
            sortable: true,
            right: false
        },
        {
            name: "Role",
            selector: "role",
            sortable: true,
            right: false
        },
        {
            name: "Action(s)",
            button: true,
            cell: (row) => (
                <>
                <FontAwesomeIcon  onClick={()=>handleDetails(row)} icon={faBars}  style={{marginRight:'10px'}}/>
                <FontAwesomeIcon onClick={()=>handleDelete(row)} icon={faTrash} className="float-end fa-trash"/>
                </>
              
            )
        }
    ]

    return ( <div className="p-5">
       
        <div className='users'>
            <DataTable 
                title="Users"
                columns={columns}
                data={users}
                defaultSortField="title"
                pagination
            />
        </div>
        {alert}
    </div> );
}
 
export default Admin;