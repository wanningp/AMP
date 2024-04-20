module.exports = (sequelize, DataTypes, User) => {
  const JournalEntry = sequelize.define("journal_entries", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  JournalEntry.associate = (models) => {
    JournalEntry.belongsTo(models.users, { foreignKey: "ID", as: "User" });
  };

  return JournalEntry;
};
