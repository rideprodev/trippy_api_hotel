module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      userId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.ENUM("request", "pending", "complete"),
        defaultValue: "request",
      },
    },
    {
      underscored: true,
    }
  );
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserData",
    });
  };
  return Transaction;
};
