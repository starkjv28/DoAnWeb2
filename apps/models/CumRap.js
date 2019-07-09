const db = require("../common/database");
const Sequelize = require("sequelize");

const CumRap = db.define("CumRap", {
  TenCum: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DiaChi: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Maps: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = CumRap