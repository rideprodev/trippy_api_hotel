module.exports = (sequelize, DataTypes) => {
  const HotelDestination = sequelize.define(
    "HotelDestination",
    {
      destinationCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      destinationName: {
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
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      indexes: [
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
  HotelDestination.associate = function (models) {};
  return HotelDestination;
};
