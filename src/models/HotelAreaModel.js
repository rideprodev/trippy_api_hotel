module.exports = (sequelize, DataTypes) => {
  const HotelArea = sequelize.define(
    "HotelArea",
    {
      areaCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      areaName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING(255),
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
          fields: ["area_code"],
        },
        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelArea.associate = function (models) {};
  return HotelArea;
};
