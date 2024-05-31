module.exports = (sequelize, DataTypes) => {
  const HotelBookingGroup = sequelize.define(
    "HotelBookingGroup",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      bookingName: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      bookingComments: {
        type: DataTypes.STRING(10),
      },
      currentReference: {
        type: DataTypes.STRING(50),
      },
      checkIn: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.STRING(50),
      },
      price: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "cancelled",
          "failed",
          "rejected",
          "bidding"
        ),
        defaultValue: "pending",
      },
      totalRooms: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      totalMember: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      isUserTravelled: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "false",
      },
      searchPayload: {
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

  HotelBookingGroup.associate = function (models) {
    HotelBookingGroup.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    HotelBookingGroup.belongsTo(models.HotelBooking, {
      // need to add this manually after all table sync
      foreignKey: "bookingId",
      as: "booking",
    });
    HotelBookingGroup.hasMany(models.HotelBooking, {
      foreignKey: "bookingGroupId",
      as: "bookings",
    });
    HotelBookingGroup.hasMany(models.HotelBookingDetail, {
      foreignKey: "bookingGroupId",
      as: "bookingDetils",
    });
    HotelBookingGroup.hasMany(models.HotelBookingLog, {
      foreignKey: "groupId",
      as: "bookingLogs",
    });
  };
  return HotelBookingGroup;
};
