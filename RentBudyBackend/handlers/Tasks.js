const express = require('express');
const dotEnv = require('dotenv').config();
const connection = require('../connection');
const Joi = require('joi');
const Router = express.Router();
const app = express();
const authHandler = require('./Auth');
const req = require('express/lib/request');
const taskSchema = Joi.object({
    Task_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    User_ID: Joi.number()
        .required()
});
function getTasks(req, res) {

    const getTasks = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM tasks", (err, result, fields) => {
            if (err) reject;
            resolve(result);
        })
    }).then((result) => {
        res.json(result);
    })

};
function getTasksById(req, res){
    const getTasksById = new Promise((resolve, reject) => {
        connection.query("SELECT * FROM tasks WHERE Task_ID=" + req.params.id, (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        // console.log(result);
        res.send(result);
    })
    return

}
function insertTask(req, res){
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        res.send(error.details);
        return;
    }
    const insertTask = new Promise((resolve, reject) => {
        connection.query("INSERT INTO tasks (Task_name, User_ID) VALUES (\"" + req.body.Task_name + "\", \"" + req.body.User_ID + "\")",
        (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        console.log(result);
        res.send(result);
    })
    return

}
function updateTask(req, res){
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
        res.send(error.details);
        return;
    }
    const updateTask = new Promise((resolve, reject) => {
        connection.query('UPDATE tasks SET ? WHERE Task_ID = ?', [{ Task_name: req.body.Task_name , User_ID: req.body.User_ID}, req.params.id], (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        console.log(result);
        res.send(result);
    })
    return
}
function deleteTask(req, res){

    const deleteTask = new Promise((resolve, reject) => {
        connection.query('DELETE FROM tasks WHERE Task_ID = ?', [req.params.id], (err, result, fields) => {
            if (err) reject;

            resolve(result);
        })
    }).then((result) => {
        console.log(result);
        res.send(result);
    })
    return
}
Router.post('/createtask', authHandler.autheticateToken, insertTask);
Router.put('/updatetask/:id', authHandler.autheticateToken, updateTask);
Router.delete('/deletetask/:id', authHandler.autheticateToken, deleteTask);
Router.get('/', authHandler.autheticateToken, getTasks);
Router.get('/:id', authHandler.autheticateToken, getTasksById);

module.exports = Router;