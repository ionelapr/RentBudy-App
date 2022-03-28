import React from 'react';

import './Main.css'
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import './Home.css';
function Home() {
    return (
        <div id="content">

            <div class='mainAction'>
                <div className='textDiv'><h3>Rent Budy</h3><h3>Your companion for sharing a flat</h3></div>
                {/* <div> */}
                <div><span>
                    <Button sx={{
                        '&.MuiButton-outlined': { color: 'black' },
                        "&.MuiButton-root": { border: "2px black solid" },
                        mr: 2,
                    }} startIcon={<HowToRegOutlinedIcon />} variant="outlined" size="large" href="/register">Register</Button>
                </span>
                    <span >
                        <Button sx={{
                            '&.MuiButton-outlined': { color: 'black' },
                            "&.MuiButton-root": { border: "2px black solid" },
                        }} startIcon={<LoginOutlinedIcon />} variant="outlined" size="large" href="/login">Login</Button>
                    </span>
                </div>
                {/* </div> */}

            </div>
        </div >



    );
};

export default Home;