const express = require('express');
const dotEnv = require('dotenv').config();
const connection = require('../connection');
const Joi = require('joi');
const Router = express.Router();
const app = express();
const authHandler = require('./Auth');
const flatHandler = require('./Flats');
const flatmemberSchema = Joi.object({
    Name: Joi.number()
        .required(),
    Surname: Joi.number()
        .required()
});
async function addFlatmember(req, res){
    const { error, value } = flatmemberSchema.validate(req.body);
    if (error) {
        res.send(error.details);
        return;
    }
    const insertFlatMember = new Promise((resolve, reject) => {
        console.log(req.body.Username)
        connection.query("INSERT INTO flatmembers ( User_ID, Flat_ID) VALUES (\"" + req.user.id + "\", \"" + req.body.Flat_ID +  "\")", (err, result, fields) => {
            if (err) reject;
            resolve(result);
            console.log(result);
        })
    }).then((result) => {
        console.log(result);
        return result;
    })
}
//verficam daca user e deja membru in alt flat, daca da returnam eroare si nu l lasam sa se inscrie in flat
async function checkIfFlatmember(req, res){
    const getFlatmember = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM flatmembers WHERE User_ID=" + req.user.id, (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        return result
    })
    const checkFlatmember= await getFlatmember;
    if(checkFlatmember.length){
        res.send('You are already a member of another flat');
        return;
    }
    else{
        msg = 'OK';
        return msg;
    }

}

function createOrjoinFlat(req, res){
    //daca nu sunt membru in alt flat
    if(checkIfFlatmember(req, res)=='OK'){
            //am creat flat si devin admin
            flatHandler.createFlat(req, res);
            userHandler.updateUserRole(req.user.id);
            //sunt adaugat ca si membru in flatmember
            addFlatmember(req, res);

            ///generez aici cod pentru urmatorii membrii??
        // }
        ///daca primesc req.body.Code--
        // else{

        // }
       console.log('okkk');
    }

}

function updateRoleWhenNewFlat(req, res){
    userHandler.updateUserRole(req.user.id);
    flatHandler.createFlat(req, res);

}
//get flatmembers from each flat 
//ROOMATES
//SELECT * FROM users u inner join flatmembers f on u.User_ID=f.User_ID and f.Flat_ID=25
async function getFlatmembersDetails(req, res)
{
    const  getFlatmembersDetails = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users u inner join flatmembers f on u.User_ID=f.User_ID and f.Flat_ID=" + req.params.id, (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        return result
    })
    const getmembers= await getFlatmembersDetails;
    console.log(getmembers);
    res.send(getmembers);


}

Router.get('/flatmembers/:id', authHandler.autheticateToken, getFlatmembersDetails);
Router.post('/updaterole', authHandler.autheticateToken, updateRoleWhenNewFlat);
Router.post('/createorjoinflat', authHandler.autheticateToken, createOrjoinFlat);
module.exports = Router;
