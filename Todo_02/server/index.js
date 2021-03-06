const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());//req.body


//Routes

//create a todo
app.post("/todos", async(req, res) => {
    try {
        
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

//get all todo
app.get("/todos", async(req, res) => {
    try {
        
        const allTodo = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");

        res.json(allTodo.rows);

    } catch (error) {
        console.error(error.message);
    }
});

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});


//update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Updated success");

    } catch (error) {
        console.console.error(error.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {

        const {id} = req.params;
        const deleteTodo =  await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Deleted success")
        
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, ()=>{
    console.log("server is running with port 5000");
});