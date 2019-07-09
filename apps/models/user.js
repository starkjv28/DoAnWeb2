const db = require("../common/database");

const Sequelize = require("sequelize");

const User = db.define("User", {
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Phone: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  UserType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  TokenUser: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  Verify: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = User