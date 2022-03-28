import React from 'react';
import './topbar.css';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export default function Topbar() {
    const logoutHandler = () => {

    };
    return (
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <span className='logo'>RentBudy</span>

                </div>
                <div className='topRight'>
                    <div className='topbarIconContainer'>
                        <HomeIcon />
                        {/* <span className='topIconBadge'>2</span> */}
                    </div>
                    <div className='topbarIconContainer'>
                        <ExitToAppIcon />
                    </div>
                    <img src='' alt='' className='topAvatar'></img>
                </div>
            </div>

        </div>
    )
}
