module.exports = (sequelize, DataTypes) => {
  const HotelCountry = sequelize.define(
    "HotelCountry",
    {
      countryCode: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      countryCode3: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      underscored: true,
    }
  );
  HotelCountry.associate = function (models) {};
  return HotelCountry;
};
