module.exports = (sequelize, DataTypes) => {
  const HotelBookingDetail = sequelize.define(
    "HotelBookingDetail",
    {
      bookingGroupId: {
        type: DataTypes.INTEGER,
      },
      roomNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      paxes: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      ages: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  HotelBookingDetail.associate = function (models) {
    HotelBookingDetail.belongsTo(models.HotelBookingGroup, {
      foreignKey: "bookingGroupId",
      as: "HotelBookingGroup",
    });
  };
  return HotelBookingDetail;
};
