const express = require("express");
const todoController = require("../controllers/todoController");
const todoRouter = express.Router();

todoRouter.get("/", todoController.getUsers);

module.exports = todoRouter;