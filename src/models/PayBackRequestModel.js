module.exports = (sequelize, DataTypes) => {
  const PayBackRequest = sequelize.define(
    "PayBackRequest",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      bookingGroupId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      transictionId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("request", "in-progress", "complete", "cancelled"),
        defaultValue: "request",
      },
    },
    {
      underscored: true,
    }
  );

  PayBackRequest.associate = function (models) {
    PayBackRequest.belongsTo(models.User, {
      foreignKey: "userId",
      as: "payBackUserData",
    });
    PayBackRequest.belongsTo(models.HotelBookingGroup, {
      foreignKey: "bookingGroupId",
      as: "PayBackGroupData",
    });
    PayBackRequest.belongsTo(models.HotelBooking, {
      foreignKey: "bookingId",
      as: "PayBackBookingData",
    });
    PayBackRequest.belongsTo(models.Transaction, {
      foreignKey: "transictionId",
      as: "PayBackTransictionData",
    });
    PayBackRequest.hasMany(models.PayBackLog, {
      foreignKey: "requestId",
      as: "PayBackLogs",
    });
  };
  return PayBackRequest;
};
