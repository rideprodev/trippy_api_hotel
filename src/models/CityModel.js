module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  City.associate = function (models) {
    City.belongsTo(models.State, {
      foreignKey: "stateId",
      as: "states",
    });
  };
  return City;
};
