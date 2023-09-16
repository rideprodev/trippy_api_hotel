module.exports = (sequelize, DataTypes) => {
  const HotelCity = sequelize.define(
    "HotelCity",
    {
      cityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      destinationCode: {
        type: DataTypes.STRING(10),
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
          fields: ["city_code"],
        },
        {
          unique: false,
          fields: ["destination_code"],
        },
        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelCity.associate = function (models) {};
  return HotelCity;
};
