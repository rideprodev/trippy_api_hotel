module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      gatewayMode: {
        type: DataTypes.ENUM("Paypal", "Mint", "system"),
        allowNull: false,
      },
      paymentFor: {
        type: DataTypes.ENUM("airline", "hotel", "wallet"),
        allowNull: false,
      },
      paymentType: {
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
      description: {
        type: DataTypes.STRING(255),
      },
      items: {
        type: DataTypes.TEXT,
      },
      payerId: {
        type: DataTypes.STRING(100),
      },
      paymentId: {
        type: DataTypes.STRING(100),
      },
      paymentContent: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM(
          "request",
          "complete",
          "refund",
          "failed",
          "transfer"
        ),
        defaultValue: "request",
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hotelBookingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    Transaction.belongsTo(models.Cards, {
      foreignKey: "cardId",
      as: "cardData",
    });
    Transaction.belongsTo(models.HotelBooking, {
      foreignKey: "hotelBookingId",
      as: "bookingDetail",
    });
  };
  return Transaction;
};
