module.exports = (sequelize, DataTypes) => {
  const HotelLocation = sequelize.define(
    "HotelLocation",
    {
      locationCode: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      locationName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING(50),
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
  HotelLocation.associate = function (models) {
    HotelLocation.hasOne(models.HotelLocationCityMap, {
      foreignKey: "locationCode",
      as: "locationMapData",
    });
  };
  return HotelLocation;
};
