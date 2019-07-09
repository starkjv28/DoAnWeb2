const db = require("../common/database");
const Sequelize = require('sequelize')
const CumRap = require('./CumRap')
const Rap = db.define("Rap", {
  TenRap: {
    type: Sequelize.STRING,
    allowNull: false

  },
  LoaiRap: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //MaCum
  KTNgang: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  KTDoc: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})
Rap.belongsTo(CumRap)
module.exports = Rap
