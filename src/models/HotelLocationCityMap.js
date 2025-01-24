module.exports = (sequelize, DataTypes) => {
  const HotelLocationCityMap = sequelize.define(
    "HotelLocationCityMap",
    {
      hotelCode: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
      },
      locationCode: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
      },
      cityCode: {
        type: DataTypes.INTEGER(30),
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
  HotelLocationCityMap.associate = function (models) {
    HotelLocationCityMap.belongsTo(models.HotelLocation, {
      foreignKey: "locationCode",
      as: "locationData",
    });
    HotelLocationCityMap.belongsTo(models.HotelCity, {
      foreignKey: "cityCode",
      as: "cityData",
    });
  };
  return HotelLocationCityMap;
};
