module.exports = (sequelize, DataTypes) => {
  const HotelFacilitiesCode = sequelize.define(
    "HotelFacilitiesCode",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      facilityCode: {
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
  HotelFacilitiesCode.associate = function (models) {};
  return HotelFacilitiesCode;
};
