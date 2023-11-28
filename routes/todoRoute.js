const express = require("express");
const todoController = require("../controllers/todoController");
const todoRouter = express.Router();

todoRouter.get("/", todoController.getUsers);

todoRouter.get("/:id", todoController.getUsers);

todoRouter.post("/", todoController.getUsers);

todoRouter.put("/:id", todoController.getUsers);

todoRouter.delete("/:id", todoController.getUsers);

module.exports = todoRouter;