const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db')

const User = sequelize.define('User', {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    // Other model options go here
  });

  module.exports = {User}