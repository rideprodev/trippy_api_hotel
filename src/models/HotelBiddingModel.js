module.exports = (sequelize, DataTypes) => {
  const HotelBidding = sequelize.define(
    "HotelBidding",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      groupId: {
        type: DataTypes.INTEGER,
      },
      roomType: {
        type: DataTypes.STRING(255),
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
      hotelCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      biddingPrice: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      minBid: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      maxBid: {
        type: DataTypes.STRING(50),
      },
      priority: {
        type: DataTypes.INTEGER(10),
        defaultValue: 1,
      },
      expairationAt: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "active",
          "inactive",
          "cancelled",
          "completed",
          "expired"
        ),
        defaultValue: "active",
        allowNull: false,
      },
      latestPrice: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      paymentMode: {
        type: DataTypes.ENUM("wallete"),
        defaultValue: "wallete",
      },
      reavalidateResponse: {
        type: DataTypes.TEXT,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["status"],
        },
      ],
      underscored: true,
    }
  );

  HotelBidding.associate = function (models) {
    HotelBidding.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    HotelBidding.belongsTo(models.HotelBookingGroup, {
      foreignKey: "groupId",
      as: "bookingGroupData",
    });
    HotelBidding.hasMany(models.HotelBiddingPrices, {
      foreignKey: "biddingId",
      as: "biddingPriceData",
    });
  };
  return HotelBidding;
};
