module.exports = (sequelize, DataTypes, User) => {
  const Budget = sequelize.define("budgets", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  Budget.associate = (models) => {
    Budget.belongsTo(models.users, { foreignKey: "ID", as: "User" });
  };

  return Budget;
};
