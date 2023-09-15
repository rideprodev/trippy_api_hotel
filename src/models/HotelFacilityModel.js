module.exports = (sequelize, DataTypes) => {
  const HotelFacilities = sequelize.define(
    "HotelFacilities",
    {
      facilityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      facilityName: {
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
          fields: ["facility_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelFacilities.associate = function (models) {};
  return HotelFacilities;
};
