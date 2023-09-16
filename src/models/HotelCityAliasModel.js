module.exports = (sequelize, DataTypes) => {
  const HotelCityAlias = sequelize.define(
    "HotelCityAlias",
    {
      cityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cityAliasesNames: {
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
      indexes: [
        {
          unique: false,
          fields: ["city_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelCityAlias.associate = function (models) {};
  return HotelCityAlias;
};
