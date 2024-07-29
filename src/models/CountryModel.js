module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      currencySign: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  Country.associate = function (models) {};
  return Country;
};
