const dotenv = require("dotenv");

const dbConfig = require("../config.js");

const { Sequelize, DataTypes, SequelizeScopeError } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, DataTypes);
db.journalEntries = require("./userJournal.model")(
  sequelize,
  DataTypes,
  db.user
);
db.budgets = require("./budget.model")(sequelize, DataTypes, db.user);
db.journalEntries.belongsTo(db.user, { foreignKey: "user_id" });
db.budgets.belongsTo(db.user, { foreignKey: "user_id" });

module.exports = db;
