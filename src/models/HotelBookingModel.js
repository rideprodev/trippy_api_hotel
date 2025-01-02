module.exports = (sequelize, DataTypes) => {
  const HotelBooking = sequelize.define(
    "HotelBooking",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      bookingGroupId: {
        type: DataTypes.INTEGER,
      },
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cityCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      roomType: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.STRING(50),
      },
      bookingDate: {
        type: DataTypes.STRING(50),
      },
      bookingReference: {
        type: DataTypes.STRING(50),
      },
      price: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(50),
      },
      commission: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      commissionAmount: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "cancelled",
          "failed",
          "rejected"
        ),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "unpaid"),
        allowNull: true,
      },
      platformStatus: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
      },
      platformPaymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "not-done", "unpaid", "failed"),
        defaultValue: "pending",
      },
      nonRefundable: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: null,
      },
      underCancellation: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: null,
      },
      expirationDate: {
        type: DataTypes.STRING(50),
      },
      cancelByDate: {
        type: DataTypes.STRING(50),
      },
      cancelledDate: {
        type: DataTypes.STRING(50),
      },
      refundAmout: {
        type: DataTypes.STRING(50),
      },
      cancellationCharge: {
        type: DataTypes.STRING(50),
      },
      cancellationPolicy: {
        type: DataTypes.TEXT,
      },
      reavalidateResponse: {
        type: DataTypes.TEXT,
      },
      searchId: {
        type: DataTypes.STRING(100),
      },
      biddingId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["hotel_code"],
        },
        {
          unique: false,
          fields: ["city_code"],
        },
        {
          unique: false,
          fields: ["status"],
        },
      ],
      underscored: true,
    }
  );

  HotelBooking.associate = function (models) {
    HotelBooking.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    HotelBooking.belongsTo(models.HotelBidding, {
      foreignKey: "biddingId",
      as: "biddingData",
    });
  };
  return HotelBooking;
};
