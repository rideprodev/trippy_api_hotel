module.exports = (sequelize, DataTypes) => {
  const HotelCity = sequelize.define(
    "HotelCity",
    {
      cityCode: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ordering: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
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
          fields: ["city_name"],
        },
      ],
      underscored: true,
    }
  );
  HotelCity.associate = function (models) {
    HotelCity.belongsTo(models.HotelCountry, {
      foreignKey: "countryCode",
      as: "countryData",
    });
  };
  return HotelCity;
};
