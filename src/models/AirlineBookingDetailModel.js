module.exports = (sequelize, DataTypes) => {
  const AirlineBookingDetail = sequelize.define(
    "AirlineBookingDetail",
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fromId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trvellingDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      airlineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flightNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      flightDepartureAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      flightArrivalAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cabinClass: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      journeyDuration: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["booking_id"],
        },
        {
          unique: false,
          fields: ["cabin_class"],
        },
      ],
      underscored: true,
    }
  );
  AirlineBookingDetail.associate = function (models) {
    AirlineBookingDetail.belongsTo(models.AirlineBooking, {
      foreignKey: "bookingId",
      as: "AirlineBooking",
    });
    AirlineBookingDetail.belongsTo(models.Airports, {
      foreignKey: "fromId",
      as: "AirlineBookingFrom",
    });
    AirlineBookingDetail.belongsTo(models.Airports, {
      foreignKey: "toId",
      as: "AirlineBookingTo",
    });
    AirlineBookingDetail.belongsTo(models.Airlines, {
      foreignKey: "airlineId",
      as: "AirlineBookingAirline",
    });
  };
  return AirlineBookingDetail;
};
