module.exports = (sequelize, DataTypes) => {
  const Bidding = sequelize.define(
    "Bidding",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      tripType: {
        type: DataTypes.ENUM("OneWay", "Return", "OpenJaw", "Circle", "Hotel"),
        defaultValue: null,
      },
      from: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      departureFrom: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      departureTo: {
        type: DataTypes.STRING(255),
      },
      airlineHotelCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      flightRoomNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      bookingClassReference: {
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
      expairationAt: {
        type: DataTypes.DATE,
      },
      sorceCode: {
        type: DataTypes.TEXT,
      },
      biddingInfromation: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM(
          "active",
          "inactive",
          "cancelled",
          "completed",
          "Not Availiable",
          "expaired"
        ),
        defaultValue: "active",
      },
      paymentMode: {
        type: DataTypes.ENUM("wallete"),
        defaultValue: "wallete",
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["departure_from"],
        },
        {
          unique: false,
          fields: ["departure_to"],
        },
      ],
      underscored: true,
    }
  );

  Bidding.associate = function (models) {
    Bidding.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    Bidding.hasMany(models.BiddingPrices, {
      foreignKey: "biddingId",
      as: "biddingData",
    });
  };
  return Bidding;
};
