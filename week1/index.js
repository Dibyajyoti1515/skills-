/**
 * To-Do Web Server (Week 1 Task)
 * 
 * 1. GET  /todos        → Returns all todos [200 OK]
 * 2. POST /todos        → Adds a todo with "task" field [201 Created]
 * 3. DELETE /todos/:id  → Deletes todo by ID [204 No Content or 404]
 * 
 * Requests:
 * - JSON or x-www-form-urlencoded bodies are accepted
 * - Example POST Body: { "task": "Do homework" }
 * 
 * Responses:
 * - All data in JSON format
 * - Error responses include status code and message
 * 
 * Start server: `node index.js` or `nodemon index.js`
 */

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

let todos = [];
let idCounter = 1;

app.get('/todos', ( req, res ) => {
    res.status(200).json(todos);
});

app.post('/todos', ( req, res ) => {

    const { task } = req.body;

    if( !task || typeof task !== 'string' ||  task.trim().length == 0){
        res.status(400).json({error: 'Task is required and must be a non-empty string'});
    }

    const todo = {
        id: idCounter++,
        task: task,
        completed: false
    }

    todos.push(todo);
    res.status(201).json({todo});

});

app.delete('/todos/:id', ( req, res ) => {

    const id = parseInt( req.params.id );
    const index = todos.findIndex( todo => todo.id === id);

    if( index === -1){
        res.status(401).json({ error: 'Todo not found'});
    }

    const deletTodo = todos[index];
    todos.splice( index, 1 );
    res.status(200).json({ message: 'Todo deleted.', todo: deletTodo });

});

app.listen( PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`)
})