module.exports = (sequelize, DataTypes) => {
  const HotelCurrency = sequelize.define(
    "HotelCurrency",
    {
      currencyCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(100),
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
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["currency_code"],
        },
        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelCurrency.associate = function (models) {};
  return HotelCurrency;
};
