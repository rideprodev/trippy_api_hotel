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
      ordering: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
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
      indexes: [
        {
          type: "FULLTEXT",
          fields: ["location_name"],
        },
      ],
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
