module.exports = (sequelize, DataTypes) => {
  const HotelFacilitiesMap = sequelize.define(
    "HotelFacilitiesMap",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      facilities: {
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
          fields: ["hotel_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelFacilitiesMap.associate = function (models) {};
  return HotelFacilitiesMap;
};
