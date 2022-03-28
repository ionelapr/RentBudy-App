import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@mui/material';
import './setting.css'
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Settings() {
    const [users, updateUsers] = useState([]);
    const { state } = useLocation();
    useEffect(function effectFunction() {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3600/users/whoami', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            })
            const json = await response.json();
            let responseList = new Array();
            responseList.push(json);
            updateUsers(responseList);
        }
        fetchUsers();
    }, []);
    return (
        <div>
            <div id="content">
                <div className='rightSide'>
                    <div className='userList'>
                        <div className='featuredItem'>
                            <div className='profile'>
                                <AccountCircleIcon style={{ fontSize: 100 }} /><h2>Profile</h2>
                            </div>
                            <div className="container">
                                <table className="table table-striped table-bordered" >
                                    <thead >
                                        <tr>
                                            <th>Id</th>
                                            <th >Username</th>
                                            <th>Name and Surname</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map((user, i) =>
                                            <tr key={i}>
                                                <td >{user.id} </td>
                                                <td >{user.username}</td>
                                                <td>{user.name} {user.surname}</td>
                                                <td><Button color="primary" variant='outlined'>Modify info</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
