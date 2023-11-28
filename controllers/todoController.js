const todoModel = require("../models/todoModels");

const getUsers = async (req, res) => {
    const users = await todoModel.getUsers();
  
    res.json(users);
    
};

module.exports = {
    getUsers,
};