const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser')
const app = express();
const mysql = require("mysql2");
const db=mysql.createPool({
    host:'localhost',
    user:"root",
    password:'Himanjal@69',
    database:'mani'
})

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}));

const port = 5000;

app.get('/api/get' , (req,res)=>{
    sqlget="select * from todos"
    db.query(sqlget,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    // db.query(querinsert,(err,result)=>{
    //     console.log(err);
    //     console.log(result);
    //     res.send("hello");
    // })
    const { title, description, due_date, priority, status} = req.body
    const queryinsert="insert into todos(title, description, due_date, priority, status) values(?,?,?,?,?)";
    db.query(queryinsert,[title, description, due_date, priority, status],(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result);  
    })   
})


app.post('/api/post/subtask', (req, res) => {
   
    const {parent_todo_id, subtodo_text} = req.body
    const queryinsertsub="insert into subtodos(subtodo_text,parent_todo_id) values(?,?)";
    db.query(queryinsertsub,[subtodo_text,parent_todo_id],(err,result)=>{
        console.log(err); 
        console.log(result);
        res.send(result);  
    })   
})






app.get('/api/get/done' , (req,res)=>{
    sqldone="select * from todos where status='Done'"
    db.query(sqldone,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
    })
})

app.get('/api/get/subtodos' , (req,res)=>{
    sqldone="select * from subtodos"
    db.query(sqldone,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
    })
})

app.get('/api/get/inprogress' , (req,res)=>{
    sqlprogress="select * from todos where status='In Progress'"
    db.query(sqlprogress,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
    })
})

app.get('/api/get/todo' , (req,res)=>{
    sqltodo="select * from todos where status='To-Do'"
    db.query(sqltodo,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
    })
})

app.get('/api/get/subtodo/:todoId', (req, res) => {
    const { todoId } = req.params;
  
    // Fetch subtasks with the specified parent_todo_id
    const query = "SELECT * FROM subtodos WHERE parent_todo_id = ?";
    db.query(query, [todoId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to fetch subtasks' });
      } else {
        console.log(result);
        res.json(result);
      }
    });
  });
  

app.put('/api/update/status/:todoId', (req, res) => {
    const { todoId } = req.params;
    const newStatus = 'Done';
  
    // Update the status of the specified Todo in the database
    const queryUpdateStatus = "UPDATE todos SET status = ? WHERE id = ?";
    db.query(queryUpdateStatus, [newStatus, todoId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update the status of the Todo' });
      } else {
        console.log(result);
        res.json({ message: 'Todo status updated to Done' });
      }
    });
  });
  


app.listen(port,()=>{
    console.log(`server started @ port ${port}`)
})

