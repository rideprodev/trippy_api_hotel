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
      transactionId: {
        type: DataTypes.INTEGER,
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "refund-Intiated", "refunded"),
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
  };
  return HotelBookingLog;
};
