const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

let todos = [];
let seed = 0;

app.post('/api/register',(req,res)=>{
    res.send({
        message: "successfully"
    })
})

app.post('/api/login',(req,res)=>{
    if(req.body.username === "por01" && req.body.password === "1234"){
        return res.send({
            token:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        })
    }
    res.status(400).send({message:"error"})
})

app.get('/api/account',(req,res)=>{
    res.send({
        user_id: 14,
        firstname: "por",
        lastname: "ja"
    })
})

app.get('/api/dashboard/14',(req,res)=> {
    res.send({data: [...todos]})
})

app.post('/api/dashboard/14',(req,res)=> {
    const data = req.body.data.map(todo => {
        todo.task_id = seed + 1;
        seed++;
        return todo;
    })
    todos = [...req.body.data] 
    res.send({message:"successful"})
})

app.delete('/api/dashboard/:id',(req,res)=>{
    todos  = todos.filter(todo => todo.task_id != req.params.id)
    res.send({message:""})
})

app.listen(8080);