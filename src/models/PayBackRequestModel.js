module.exports = (sequelize, DataTypes) => {
  const PayBackRequest = sequelize.define(
    "PayBackRequest",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      balance: {
        type: DataTypes.STRING(50),
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
      status: {
        type: DataTypes.ENUM("request", "in-progress", "complete", "cancelled"),
        defaultValue: "request",
      },
    },
    {
      underscored: true,
    }
  );

  PayBackRequest.associate = function (models) {
    PayBackRequest.belongsTo(models.User, {
      foreignKey: "userId",
      as: "payBackRequest",
    });
    PayBackRequest.hasMany(models.PayBackLog, {
      foreignKey: "requestId",
      as: "PayBackLogs",
    });
  };
  return PayBackRequest;
};
