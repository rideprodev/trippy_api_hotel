module.exports = (sequelize, DataTypes) => {
  const HotelBookingDetail = sequelize.define(
    "HotelBookingDetail",
    {
      bookingGroupId: {
        type: DataTypes.INTEGER,
      },
      paxes: {
        type: DataTypes.TEXT,
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
