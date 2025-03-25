const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const app = express();
const port = 3000;

const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

const todos = [
    {
        id: 1,
        desc: "Attend Daily Standup",
        completed: true,
    },
    {
        id: 2,
        desc: "Learn Node and Express through a project",
        completed: false,
    },
];

app.get("/", (req, res) => {
    res.send("To-do list home page");
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.get("/todos/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

app.post("/todos", (req, res) => {
    const body = req.body;
    const newTodo = { id: uuid.v4(), ...body }; // Generate a new UUID for the new todo
    todos.push(newTodo);
    res.status(201).json(newTodo); // Respond with the created todo
});

app.put("/todos/:id", (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        todo.desc = req.body.desc;
        todo.completed = req.body.completed;
        res.json(todos); // Respond with the updated todo
    } else {
        res.status(404).send("Todo with given id doesn't exist");
    }
});

app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex((todo) => todo.id == req.params.id);
    if (index !== -1) {
        todos.splice(index, 1); // Remove the todo from the array
        res.send("Todo with the given id has been deleted successfully");
    } else {
        res.status(404).send("Todo with given id doesn't exist");
    }
});

app.listen(port, () => {
    console.log("App is listening on PORT:", port);
});
