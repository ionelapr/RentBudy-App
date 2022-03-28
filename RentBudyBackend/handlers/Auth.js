const express = require('express');
const dotEnv = require('dotenv').config();
const connection = require('../connection');
const Joi = require('joi');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
    const loginUser = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE Username=\"" + req.body.Username + "\"", (err, result, fields) => {
            if (err) {
                console.log(err);
                reject;
            }
            resolve(result);
        })
    }).then((result) => {
        return {
            password: result[0].Password,
            id: result[0].User_ID,
            role_id: result[0].Role_ID
        }
    });
    const userResponse = await loginUser;
    const checkPassword = await bcrypt.compare(req.body.Password, userResponse.password);
    // console.log(req.body.Password + ' ' + userResponse.password + ' ' + checkPassword);
    if (checkPassword) {
        const user = {
            username: req.body.Username,
            id: userResponse.id,
            role_id: userResponse.role_id,

        }
        console.log(user);
    
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken });
    }
    else {
        res.json({ error: 'User or password incorect' });
    }


}
//middleware
function autheticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    
    const token = authHeader
    if (token == null) return res.sendStatus(403)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = Router;
module.exports.autheticateToken=autheticateToken;
module.exports.loginUser = loginUser;