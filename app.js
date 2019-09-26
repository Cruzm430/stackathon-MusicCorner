const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const db = require('./db')
const {School, Student} = db.models

app.use('/build', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/schools', (req,res,next)=>{
  School.findAll()
    .then(schools=>res.send(schools))
    .catch(next)
})

app.get(`/school/:id`, (req,res,next)=>{
  School.findByPk(req.params.id)
  .then(school=>res.send(school))
  .catch(next)
})

app.get('/api/students', async (req,res,next)=>{
  Student.findAll()
    .then(students => res.send(students))
    .catch(next)
})

app.put('/api/students/:id', (req,res,next)=>{
  Student.findByPk(req.params.id)
  .then(student=>student.update(req.body))
  .then(student => res.send(student))
  .catch(next)
})

app.post('/api/students', (req,res,next)=>{
  Student.create(req.body)
  .then(student=> res.send(student))
  .then(()=>res.status(201))
  .catch(next)
})

app.delete('/api/students/:id', (req, res, next)=>{
  Student.findByPk(req.params.id)
  .then(student => student.destroy())
  .then(()=>res.sendStatus(204))
  .catch(next)
})

module.exports = app;