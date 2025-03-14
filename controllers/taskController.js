const Task = require('../models/taskModel');

const getTasks = async (req, res)=>{
    res.send('get tasks works');
}

const createTasks = async (req,res)=>{
    res.send('create tasks works');
}

module.exports = {
    getTasks,
    createTasks
};
