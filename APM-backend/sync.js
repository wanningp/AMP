// const sequelize = require("./config");
// const User = require("./Models/user.model");

// const Users = sequelize.define("users", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
// });

// Sync all defined models to the database
// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // Use { force: true } during development to drop and re-create tables
//     console.log("Database synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing the database:", error);
//   }
// })();
