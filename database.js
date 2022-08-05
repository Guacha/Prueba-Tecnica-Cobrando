const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

const Empleado = db.define('empleados', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido2: {
    type: DataTypes.STRING,
  },
  // codigo_departamento is a foreign key
  codigo_departamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const departamento = db.define('departamentos', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  presupuesto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Empleado.belongsTo(departamento, { foreignKey: 'codigo_departamento' });

departamento.sync({ force: true }).then(() => {
  console.log('Departamentos table created successfully');
  Empleado.sync({ force: true }).then(() => {
    console.log('Empleados table created successfully');
  });
});

module.exports = { db, Empleado, departamento };
