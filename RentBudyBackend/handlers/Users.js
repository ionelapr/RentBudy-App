const express = require('express');
const dotEnv = require('dotenv').config();
const connection = require('../connection');
const authHandler = require('./Auth');
const Joi = require('joi');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = Joi.object({
    Name: Joi.string()
        .required(),
    Surname: Joi.string()
        .required(),
    Username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    Password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    Role_ID: Joi.number()
        .required()
});
async function createUser(req, res) {
    const { error, value } = userSchema.validate(req.body);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)

    if (error) {
        res.send(error.details);
        return;
    }
    const getUsersByUsername = new Promise((resolve, reject) => {
        console.log(req.body.Username)
        connection.query("SELECT * FROM users WHERE Username=\"" + req.body.Username + "\"", (err, result, fields) => {
            if (err) reject;
            resolve(result);
            console.log(result);
        })
    }).then((result) => {
        console.log(result);
        return result;
    })
    const checkUsername=await getUsersByUsername;
    if(checkUsername.length){
             res.send('Registration error');
            return;
    }
    else
    {

        const insertUser = new Promise((resolve, reject) => {
            connection.query("INSERT INTO users ( Name, Surname, Username, Password, Role_ID) VALUES (\"" + req.body.Name + "\", \"" + req.body.Surname + "\",\"" + req.body.Username + "\", \"" + hashedPassword + "\", \"" + '2'+ "\")",
                (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        reject;
                    }
                    resolve(result);
                })
        }).then((result) => {
            console.log(result);
            res.send(result);
        })
    }
   


};


function getUsers(req, res) {

    const getUsers = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users", (err, result, fields) => {
            if (err) reject;
            resolve(result);
        })
    }).then((result) => {
        res.json(result);
    })

};
//update roleID
function updateUserRole(user_id){
    const setAdminRole = new Promise((resolve, reject) => {
        connection.query("UPDATE users SET Role_ID=1 WHERE User_ID=" + user_id, (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        // console.log(result);
        // res.send(result);
    })
    return

}
function getUsersById(req, res) {

    console.log(req.user);
    console.log(req.params.id);

    if (req.params.id == req.user.id) {

        const getUsersById = new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE User_ID=" + req.params.id, (err, result, fields) => {
                if (err) reject;

                resolve(result);
            })
        }).then((result) => {
            // console.log(result);
            res.send(result);
        })
        return
    }
    res.send('Unauthorized');



};
 async function whoamI(req, res) {
     console.log('this is id');
     console.log(req.params.id);
    const getUserById = new Promise((resolve, reject) => {
        connection.query("SELECT * from users u inner JOIN flatmembers f on u.User_ID=f.User_ID WHERE f.User_ID=" + req.params.id, (err, result, fields) => {
            if (err) 
            {
                console.log(err);
                reject;
            }
            resolve(result);
        })
    }).then((result) => {
        
        return {
            id: result[0].User_ID,
            name: result[0].Name,
            surname: result[0].Surname,
            username:result[0].Username,
            role_id: result[0].Role_ID,
            flat_id: result[0].Flat_ID,
        }
    })
    const userResp = await getUserById;
    console.log(userResp);
    res.send(userResp);
    
};
function changepasswordUtil(req, res){
    userToken=req.headers['authorization'];
    res.json(userToken);
}



Router.post('/', createUser);
Router.get('/', getUsers);
Router.post('/login', authHandler.loginUser);
Router.get('/:id', authHandler.autheticateToken);
Router.get('/whoami/:id', whoamI);
Router.get('/passwordutil', changepasswordUtil);
Router.get('/:id', getUsersById);
module.exports = Router;
