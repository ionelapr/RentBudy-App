const express = require('express');
const dotEnv = require('dotenv').config();
const connection = require('../connection');
const Joi = require('joi');
const Router = express.Router();
const app = express();
const authHandler = require('./Auth');
const flatSchema = Joi.object({
    Name: Joi.string()
        .required(),
    City: Joi.string()
        .required(),
    Street: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    County: Joi.string()
        .required()
});
function getFlats(req, res) {

    const getFlats = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM flat", (err, result, fields) => {
            if (err) reject;
            resolve(result);
        })
    }).then((result) => {
        res.json(result);
    })

};
function createFlat(req, res) {
    const { error, value } = flatSchema.validate(req.body);
    if (error) {
        console.log(error.details);
        res.send(error.details);
    
        return;
    }
   
        const insertFlat = new Promise((resolve, reject) => {
            connection.query("INSERT INTO flat ( Name, City, Street, County) VALUES (\"" + req.body.Name + "\", \"" + req.body.City + "\",\"" + req.body.Street + "\", \"" + req.body.County + "\")",
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
  
   


};

async function getIdByFlatname(flat_name){
    const getId = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM flat WHERE Name=" + req.body.Name, (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        return result
    })
    const getFlatId= await getId;
    if(getFlatId.length){
        console.log(getFlatId);
        return;
    }
    else{
       res.send('Flat not found')
    }

}
Router.get('/', authHandler.autheticateToken, getFlats);
Router.post('/createflat', authHandler.autheticateToken, createFlat);
module.exports = Router;
module.exports.createFlat = createFlat;
module.exports.getIdByFlatname = getIdByFlatname;