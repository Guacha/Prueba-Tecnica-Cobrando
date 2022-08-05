const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, Empleado, departamento } = require('./database.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 1234;

// GET /empleados
app.get('/empleados', (req, res) => {
  Empleado.findAll()
    .then((empleados) => res.json(empleados))
    .catch((error) => res.status(500).json(error));
});

//POST /empleado
app.post('/empleado', (req, res) => {
  Empleado.create(req.body)
    .then((empleado) => res.json(empleado))
    .catch((error) => res.status(500).json(error));
});

//GET /empleado/:id
app.get('/empleado/:id', (req, res) => {
  Empleado.findByPk(req.params.id)
    .then((empleado) => res.json(empleado))
    .catch((error) => res.status(500).json(error));
});

//PUT /empleado/:id
app.put('/empleado/:id', (req, res) => {
  Empleado.update(req.body, { where: { id: req.params.id } })
    .then((empleado) => res.json(empleado))
    .catch((error) => res.status(500).json(error));
});

//DELETE /empleado/:id
app.delete('/empleado/:id', (req, res) => {
  Empleado.destroy({ where: { id: req.params.id } })
    .then((empleado) => res.json(empleado))
    .catch((error) => res.status(500).json(error));
});

//GET /departamentos
app.get('/departamentos', (req, res) => {
  departamento
    .findAll()
    .then((departamentos) => res.json(departamentos))
    .catch((error) => res.status(500).json(error));
});

//POST /departamento
app.post('/departamento', (req, res) => {
  departamento
    .create(req.body)
    .then((departamento) => res.json(departamento))
    .catch((error) => res.status(500).json(error));
});

//GET /departamento/:id
app.get('/departamento/:id', (req, res) => {
  departamento
    .findByPk(req.params.id)
    .then((departamento) => res.json(departamento))
    .catch((error) => res.status(500).json(error));
});

//PUT /departamento/:id
app.put('/departamento/:id', (req, res) => {
  departamento
    .update(req.body, { where: { id: req.params.id } })
    .then((departamento) => res.json(departamento))
    .catch((error) => res.status(500).json(error));
});

//DELETE /departamento/:id
app.delete('/departamento/:id', (req, res) => {
  departamento
    .destroy({ where: { id: req.params.id } })
    .then((departamento) => res.json(departamento))
    .catch((error) => res.status(500).json(error));
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
