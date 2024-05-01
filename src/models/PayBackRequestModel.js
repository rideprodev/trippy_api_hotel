module.exports = (sequelize, DataTypes) => {
  const PayBackRequest = sequelize.define(
    "PayBackRequest",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      hotelGroupId: {
        type: DataTypes.INTEGER,
      },
      requestFor: {
        type: DataTypes.ENUM("airline", "hotel", "wallet"),
        allowNull: false,
      },
      requestType: {
        type: DataTypes.ENUM("direct", "bid", "adjust"),
        allowNull: false,
      },
      total: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: DataTypes.STRING(50),
        defaultValue: "AUD",
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("request", "in-progress", "complete", "cancelled"),
        defaultValue: "request",
      },
      comment: {
        type: DataTypes.STRING(255),
      },
    },
    {
      underscored: true,
    }
  );

  PayBackRequest.associate = function (models) {
    PayBackRequest.belongsTo(models.User, {
      foreignKey: "userId",
      as: "payBackRequest",
    });
    PayBackRequest.belongsTo(models.HotelBookingGroup, {
      foreignKey: "hotelGroupId",
      as: "bookingDetail",
    });
    PayBackRequest.hasMany(models.PayBackLog, {
      foreignKey: "requestId",
      as: "PayBackLogs",
    });
  };
  return PayBackRequest;
};
