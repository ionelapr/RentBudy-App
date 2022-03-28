import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Typography, Link } from '@mui/material';
import { Button } from '@mui/material';
import './Main.css';
// import jwt_decode from "jwt-decode";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Navigate, useParams } from 'react-router-dom';

const Register = () => {

    const paperStyle = { padding: 30, heigth: '80vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: "#1976d2" };
    const btnStyle = { margin: '8px 0px' };
    const headerStyle = { padding: 10, margin: 0, width: 56, height: 56, backgroundColor: '#1976d2' };
    const [redirect, setRedirect] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setpassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [authToken, setAuthToken] = useState('');
    const params = useParams();
    // console.log(params);
    if (redirect) {
        console.log(authToken);
        console.log(redirect);
        return <Navigate to='/register/step/2' state={{ token: authToken }} />

        // render={() => !redirect ? <Login /> : <Home />} 
    }


    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    const handleSurname = (e) => {
        setSurname(e.target.value);
        setSubmitted(false);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (password !== confirmPassword) {
            setError(true)
            //un paramentru care sa zica de eroarea ca pass nu e egala cu confirm pass
        }
        setSubmitted(false);
    };
    //cred ca ar trebui si ceva validare facuta daca Password=ConfirmPassword-- nu cred ca e bun , dar e o idee.
    function validateForm() {
        return (
            password === confirmPassword
        );
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError(true);
        } else {

            //pot sa il export ca sa il folosesc la update password
            const registCall = await fetch('http://localhost:3600/users', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },

                body: JSON.stringify({ Name: name, Surname: surname, Username: username, Password: password, Role_ID: 1 })

            });
            // const decoded = jwt_decode(JSON.authToken).id;
            // console.log(decoded);
            if (registCall) {
                //set authToken
                //nou call de fetch cas a il autentific(cu username si password)=> cu authtoken il sete cu setauthtoken in state-ul meu.
                const loginCall = await fetch('http://localhost:3600/users/login/', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },

                    body: JSON.stringify({ Username: username, Password: password })
                });
                const json = await loginCall.json();
                //de aici imi da tokenul
                console.log(json);
                if (!json.error) {
                    //aici???
                    setAuthToken(json.accessToken);
                    setSubmitted(true);
                    setError(false);
                    setTimeout(() => setRedirect({ redirect: true }), 2000);

                } else {
                    setSubmitted(false);
                    setError(json.error);
                }
                setSubmitted(true);
                setError(false);
                setTimeout(() => setRedirect({ redirect: true }), 2000);
            } else {
                setSubmitted(false);
                setError(true);
            }
            console.log(error);
            // const history = useNavigate();
            // history('/login');
            // setTimeout(() => {

            // }, 2000);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h4>User {name} successfully registered!</h4>
            </div>
        );
    };
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                    color: '#ef0037',
                }}>
                <h4>Please enter all the fields!</h4>
            </div>
        );
    };


    return (
        <main>

            <div id="content">
                <header align='center' style={{ color: "#1976d2" }}><h2>Rent Budy</h2><h2>Your companion for sharing a flat</h2></header>
                <Grid align='center' marginTop={10}>
                    <Paper elevation={10} style={paperStyle}>
                        <Avatar style={avatarStyle} href="/"><PersonAddIcon /></Avatar>
                        <h2 style={btnStyle}>Register</h2>
                        {/* Calling to the methods */}
                        <div className="messages">
                            {errorMessage()}
                            {successMessage()}
                        </div>
                        <TextField id="outlined-basic" label="Name" onChange={handleName} variant="outlined"
                            style={btnStyle} fullWidth />
                        <TextField id="outlined-basic" label="Surname" onChange={handleSurname} variant="outlined"
                            style={btnStyle} fullWidth />
                        <TextField required id="outlined-basic" label="Username" onChange={handleUsername} variant="outlined"
                            style={btnStyle} fullWidth />
                        <TextField required id="outlined-basic" label="Password" onChange={handlePassword}
                            style={btnStyle} type="password" variant="outlined" fullWidth />
                        <TextField required id="outlined-basic" label="Please confirm the password"
                            style={btnStyle} type="password" variant="outlined" fullWidth />

                        <Button type='submit' variant='contained' onClick={handleSubmit} color="primary" style={btnStyle} fullWidth>Create Account</Button>
                        <Typography style={btnStyle}>Do you have an account? <Link href="/login">Login</Link></Typography>
                    </Paper>
                </Grid>
            </div>
        </main>
    )
};

export default Register;