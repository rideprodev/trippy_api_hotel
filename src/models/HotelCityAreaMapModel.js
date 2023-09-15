module.exports = (sequelize, DataTypes) => {
  const HotelCityAreaMap = sequelize.define(
    "HotelCityAreaMap",
    {
      cityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      areaCode: {
        type: DataTypes.STRING(10),
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
          fields: ["city_code"],
        },
        {
          unique: false,
          fields: ["area_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelCityAreaMap.associate = function (models) {};
  return HotelCityAreaMap;
};
