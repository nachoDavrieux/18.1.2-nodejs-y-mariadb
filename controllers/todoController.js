const todoModel = require("../models/todoModels");

const getUsers = async (req, res) => {
    const users = await todoModel.getUsers();
    res.json(users);
};

const getUsersById = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await todoModel.getUsersById(id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: "Usuario no encontrado"});
    }
};

const createUser = async (req, res) => {
    const createdUser = await todoModel.createUser(req.body);
    if(createdUser){
        res.json(createUser);
    }else{
        res.status(500).json({message: "Se rompio el servidor"});
    }
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await todoModel.getUsersById(id);
    if(user){
        const updatedUser = await todoModel.updateUser(parseInt(req.params.id), {
            ...user,
            ...req.body,
        });

        if(updatedUser){
            res.json(updatedUser);  
          }else{
              res.status(500).json({message: "Se rompio el servidor"});
          }
    }else{
        res.status(404).json({message: "Usuario no encontrado"});
    } 
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await todoModel.getUsersById(id);
    if(user){
        const result = await todoModel.deleteUserUser(parseInt(req.params.id));

        if(result){
            res.json(result);
        }else{
            res.status(500).json({message: "Se rompio el servidor"});
        }
    }else{
        res.status(404).json({message: "Usuario no encontrado"});
    }

};

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
};