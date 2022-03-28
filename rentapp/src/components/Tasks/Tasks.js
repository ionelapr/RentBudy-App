import React, { useState, useEffect } from 'react';


import "./tasks.css"
import { Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';

import { useLocation } from 'react-router-dom';

export default function Tasks() {

    const [visibleC, setVisibleC] = React.useState(false);
    const [visibleU, setVisibleU] = React.useState(false);
    const btnStyle = { margin: '8px 2px' };
    const [tasks, updateTasks] = useState('');

    const [selectedTask, setSelectedTask] = useState({});

    // const [rows, setRows] = useState([]);
    const { state, pathname } = useLocation();
    //pt create
    const [Task_name, setTaskname] = useState('');
    const [User_ID, setResponsable] = useState('');
    const [Task_ID, setTaskID] = useState('');
    const handleTask = (e) => {
        setTaskname(e.target.value);
    };
    const handleTaskName = (e) => {
        setSelectedTask({ ...selectedTask, Task_name: e.target.value });
    };
    const handleResponsable = (e) => {
        setResponsable(e.target.value);
    };
    //CREATE TASK
    const handleCreatetask = async (e) => {
        e.preventDefault();
        const taskCall = await fetch('http://localhost:3600/tasks/createtask', {
            method: 'POST',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ Task_name: Task_name, User_ID: User_ID })
        });
        console.log(state);
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                console.log(json);
                updateTasks(json);
                console.log(tasks);
            }
            fetchTasks();
        }
        // 
        async function fetchTasks() {
            const response = await fetch('http://localhost:3600/users/whoami', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            let json = await response.json();
            console.log(json);
            //updateTasks(json);
            console.log(tasks);
        }
        fetchTasks();
        setVisibleC(false);

    }
    //GET TASKS FROM DB
    useEffect(function effectFunction() {
        async function fetchTasks() {
            const response = await fetch('http://localhost:3600/tasks', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            let json = await response.json();
            console.log(json);
            updateTasks(json);
            console.log(tasks);
        }
        fetchTasks();
    }, []);
    const getTasks = (e) => {
    }
    //update method
    const onUpdate = async (task) => {
        let { Task_ID, ...payload } = task;
        const taskCall = await fetch('http://localhost:3600/tasks/updatetask/' + task.Task_ID, {
            method: 'PUT',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(payload)
        });
        console.log(tasks)
        console.log(state);
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                console.log(json);
                updateTasks(json);
                console.log(tasks);
            }
            fetchTasks();
            setVisibleU(false);

        }
    }
    //delete function
    const onDelete = async (id) => {
        const taskCall = await fetch('http://localhost:3600/tasks/deletetask/' + id, {
            method: 'DELETE',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ Task_ID: Task_ID })

        });
        console.log(state);
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                console.log(json);
                updateTasks(json);
                console.log(tasks);
            }
            fetchTasks();

        }
    }
    return (
        <div>

            <div className='rightSide'>
                <div>
                    <Button id="createBtn" variant='contained' color="primary" onClick={() => { setVisibleC(true); setVisibleU(false) }}>Create task</Button>
                </div>
                <div className='featuredItem'>
                    <div>
                        <h2>List of tasks</h2>
                        {/* <button onClick={getUsersById}>Users</button> */}
                    </div>
                    <table className="table table-striped table-bordered" >
                        <thead >
                            <tr>
                                <th>Id</th>
                                <th >Task name</th>
                                <th >User Responsable</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.map((task, i) =>
                                <tr key={i}>
                                    <td >{task.Task_ID} </td>
                                    <td >{task.Task_name}</td>
                                    <td >{task.User_ID}</td>
                                    <td>
                                        <Button color="primary" variant='outlined' onClick={() => { setSelectedTask(task); setVisibleU(true); setVisibleC(false) }}>Update</Button>
                                        <Button color="primary" variant='outlined' onClick={() => onDelete(task.Task_ID)}>Delete</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* create task */}
                {visibleC && <div className='featuredItem create' >
                    <div>
                        <h2>Add a new task</h2>
                    </div>
                    <TextField id="outlined-basic" label="Task name" variant="standard"
                        fullWidth style={btnStyle} onChange={handleTask} />
                    <InputLabel id="demo-simple-select-standard-label">User Responsable</InputLabel>
                    <Select
                        onChange={handleResponsable}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        fullWidth
                        style={btnStyle}
                        label="User_ID"
                    >
                        {/* cred ca aici in MenuItem trebuie sa mearga sa aleg un user */}
                        <MenuItem value={tasks.User_ID}>{tasks.User_ID}</MenuItem>
                        <MenuItem value={3}>User 2</MenuItem>
                        <MenuItem value={4}>User 3</MenuItem>
                    </Select>
                    <Button type='submit' variant='contained' color="primary" onClick={handleCreatetask} style={btnStyle} >Add to list
                    </Button> </div>}
                {/* //update a task */}
                {visibleU && <div className='featuredItem update'> <div>
                    <h2>Update a task</h2>
                </div>
                    <TextField id="outlined-basic" value={selectedTask.Task_name} label="Task name" onChange={handleTaskName} variant="standard"
                        fullWidth style={btnStyle} />
                    <InputLabel id="demo-simple-select-standard-label">User Responsable</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={handleResponsable}
                        fullWidth
                        style={btnStyle}
                        label="User_ID"
                    >
                        {/* cred ca aici in MenuItem trebuie sa mearga sa ales un user */}
                        <MenuItem value={tasks.User_ID}>{tasks.User_ID}</MenuItem>
                        {/* <MenuItem value={20}>User 2</MenuItem>
                        <MenuItem value={30}>User 3</MenuItem> */}
                    </Select>
                    <Button type='submit' variant='contained' color="primary" style={btnStyle} onClick={() => onUpdate(selectedTask)}>Update the task
                    </Button>
                </div>}
            </div>
        </div >

    )
}
