module.exports = (sequelize, DataTypes) => {
  const HotelLocation = sequelize.define(
    "HotelLocation",
    {
      locationCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
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
      indexes: [
        {
          unique: false,
          fields: ["location_code"],
        },
        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelLocation.associate = function (models) {};
  return HotelLocation;
};
