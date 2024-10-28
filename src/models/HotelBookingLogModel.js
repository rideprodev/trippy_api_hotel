module.exports = (sequelize, DataTypes) => {
  const HotelBookingLog = sequelize.define(
    "HotelBookingLog",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      groupId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      cardId: {
        type: DataTypes.INTEGER,
      },
      transactionId: {
        type: DataTypes.INTEGER,
      },
      paymentStatus: {
        type: DataTypes.ENUM(
          "booked",
          "cancelled",
          "paid",
          "refund-Intiated",
          "refunded",
          "payment-failed"
        ),
        defaultValue: null,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["payment_status"],
        },
      ],
      underscored: true,
    }
  );

  HotelBookingLog.associate = function (models) {
    HotelBookingLog.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    HotelBookingLog.belongsTo(models.HotelBookingGroup, {
      foreignKey: "groupId",
      as: "bookingGroupData",
    });
    HotelBookingLog.belongsTo(models.HotelBooking, {
      foreignKey: "bookingId",
      as: "bookingData",
    });
    HotelBookingLog.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
      as: "transactionData",
    });
    HotelBookingLog.belongsTo(models.Cards, {
      foreignKey: "cardId",
      as: "cardData",
    });
  };
  return HotelBookingLog;
};
