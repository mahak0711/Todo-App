const express = require('express');
const bodyParser = require('body-parser');
const port=3000;
const app = express();
const path = require('path');
const cors = require('cors');//for directly running the html code in other way file
app.use(bodyParser.json());
app.use(cors());

let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  res.json(todos);
});


var CTR=1;
app.post('/todos', (req, res) => {
  const newTodo = {
    id: CTR, // unique random id
    title: req.body.title,
    description: req.body.description
  };
  CTR=CTR+1;
  todos.push(newTodo);//pushing onto the server 
  res.status(201).json(newTodo);
});


app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

// for all other routes, return 404
//app.use((req, res, next) => {
  //res.status(404).send();
//});
 
app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
})
app.listen(3000);