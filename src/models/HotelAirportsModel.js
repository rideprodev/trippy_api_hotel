module.exports = (sequelize, DataTypes) => {
  const HotelAirports = sequelize.define(
    "HotelAirports",
    {
      airportCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      airportName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      cityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cityName: {
        type: DataTypes.STRING(200),
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
          unique: false,
          fields: ["airport_code"],
        },
        {
          unique: false,
          fields: ["city_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelAirports.associate = function (models) {};
  return HotelAirports;
};
