module.exports = (sequelize, DataTypes) => {
  const AirlineBooking = sequelize.define(
    "AirlineBooking",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tripType: {
        type: DataTypes.ENUM("OneWay", "Return", "OpenJaw", "Circle"),
        defaultValue: "OneWay",
      },
      totalMember: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      adultMember: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      childMember: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      infantMember: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      membersId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isUserTravelled: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "false",
      },
      margin: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
      },
      fareType: {
        type: DataTypes.ENUM("Public", "Private", "Webfare"),
        defaultValue: "Public",
      },
      nationalityCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      currencyCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      totalFairCurrency: {
        type: DataTypes.DOUBLE(16, 2),
        defaultValue: "0.00",
      },
      totalFairUsd: {
        type: DataTypes.DOUBLE(16, 2),
        defaultValue: "0.00",
      },
      bookingStatus: {
        type: DataTypes.ENUM(
          "Pending",
          "Confirmed",
          "Booked",
          "NotBooked",
          "BookingInProcess"
        ),
        defaultValue: "Pending",
        allowNull: false,
      },
      bookingUniqueId: {
        type: DataTypes.STRING(255),
      },
      bookingDate: {
        type: DataTypes.STRING(255),
      },
      tktTimeLimit: {
        type: DataTypes.STRING(255),
      },
      ticketStatus: {
        type: DataTypes.ENUM(
          "Pending",
          "TktInProcess",
          "Ticketed",
          "Cancelled"
        ),
        defaultValue: "Pending",
        allowNull: false,
      },
      fareSourceCode: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      IsRefundable: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "false",
      },
      transactionId: {
        type: DataTypes.INTEGER,
      },
      biddingId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["booking_unique_iD"],
        },
        {
          unique: false,
          fields: ["trip_type"],
        },
        {
          unique: false,
          fields: ["booking_status"],
        },
        {
          unique: false,
          fields: ["ticket_status"],
        },
      ],
      underscored: true,
    }
  );
  AirlineBooking.associate = function (models) {
    AirlineBooking.belongsTo(models.User, {
      foreignKey: "userId",
      as: "AirlineBookingUser",
    });
    AirlineBooking.belongsTo(models.Bidding, {
      foreignKey: "biddingId",
      as: "BiddingData",
    });
    AirlineBooking.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
      as: "transactionData",
    });
    AirlineBooking.hasMany(models.AirlineBookingDetail, {
      foreignKey: "bookingId",
    });
  };
  return AirlineBooking;
};
