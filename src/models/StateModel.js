module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "State",
    {
      countryId: {
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
  State.associate = function (models) {
    State.belongsTo(models.Country, {
      foreignKey: "countryId",
      as: "countries",
    });
  };
  return State;
};
