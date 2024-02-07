module.exports = (sequelize, DataTypes) => {
  const HotelBooking = sequelize.define(
    "HotelBooking",
    {
      userId: {
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
      bookingId: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      bookingDate: {
        type: DataTypes.STRING(50),
      },
      bookingReference: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "unpaid"),
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
      cancelByDate: {
        type: DataTypes.STRING(50),
      },
      supportsCancellation: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "false",
      },
      searchId: {
        type: DataTypes.STRING(100),
      },
      searchPayload: {
        type: DataTypes.TEXT,
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
      ],
      underscored: true,
    }
  );

  HotelBooking.associate = function (models) {
    HotelBooking.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
  };
  return HotelBooking;
};
