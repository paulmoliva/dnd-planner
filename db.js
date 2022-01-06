const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(`mysql://root:${process.env.PASS}@localhost:3306/dnd-planner`)

module.exports = db;