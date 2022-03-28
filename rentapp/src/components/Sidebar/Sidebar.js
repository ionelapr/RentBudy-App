import React from 'react'
import './sidebar.css'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const style = {
        textDecoration: 'none',
        color: "#555"
    }
    const { state } = useLocation();
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Dashboard</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem active' ><LineStyleIcon className='sidebarIcon' /><Link to="/dashboard" state={state} style={style}>Home</Link></li>
                    </ul>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'><TimelineIcon className='sidebarIcon' /><Link to="/dashboard/expenses" state={state} style={style}>Expenses</Link></li>
                    </ul>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'><TrendingUpIcon className='sidebarIcon' /><Link to="/dashboard/reports" state={state} style={style}>Reports</Link></li>
                    </ul>

                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>House</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem active' ><RoomPreferencesIcon className='sidebarIcon' /><Link to="/dashboard/users" state={state} style={style}>Roommates</Link></li>
                    </ul>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'><AddTaskIcon className='sidebarIcon' /><Link to="/dashboard/tasks" state={state} style={style}>Tasks</Link></li>
                    </ul>


                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarListItem'> <SettingsAccessibilityIcon /><Link to="/dashboard/settings" state={state} style={style}>Settings</Link></h3>
                </div>
                {/* <Routes>
                    <Route path='/dashboard/users' element={<Userlist />}></Route>
                </Routes> */}
            </div>
        </div>
    )
}
