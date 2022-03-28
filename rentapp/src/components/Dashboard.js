import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import './Dashboard.css';
import MainPage from './MainDashboard/MainPage';
import Userlist from './Userlist/Userlist';
import Settings from './Settings/Settings';
import Tasks from './Tasks/Tasks';
import Expenses from './Expenses/Expenses';
import Report from './Reports/Report';


function Dashboard() {
    let { id } = useParams();
    const [users, updateUsers] = useState([]);
    const { state, pathname } = useLocation();
    const navigation = useNavigate();
    const pageName = pathname.split('dashboard/');

    const renderContent = () => {
        if (pageName[1]) {
            switch (pageName[1]) {
                case 'users':
                    return <Userlist />;
                case 'settings':
                    return <Settings />;
                case 'tasks':
                    return <Tasks />;
                case 'expenses':
                    return <Expenses />;
                case 'reports':
                    return <Report />;
            }
        } else {
            return <MainPage />

        }
    }
    useEffect(function effectFunction() {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3600/users/whoami', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                }
            });

            const json = await response.json();
            console.log(json);
            updateUsers(json);
            console.log(users);
            //console.log(match);
        }
        if (!state) {
            return navigation("/login");
        }
        fetchUsers();
    }, []);

    return (
        <div id="content">
            <header><Topbar /></header>
            <div className='container'>
                <Sidebar />

                <div className='rightSide'>

                    {renderContent()}


                </div>
            </div>
        </div >
    );
};
export default Dashboard;