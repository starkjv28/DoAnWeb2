const db = require("../common/database");
const Sequelize = require("sequelize")

const DatCho = require('./DatCho')

const Ve = db.define('Ve', {
  MaVe: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  MaGhe: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DiaChiNgang: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DiaChiDoc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  GiaTien: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Ve.belongsTo(DatCho)
module.exports = Ve