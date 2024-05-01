module.exports = (sequelize, DataTypes) => {
  const PayBackLog = sequelize.define(
    "PayBackLog",
    {
      requestId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("request", "in-progress", "complete", "cancelled"),
        defaultValue: "request",
      },
      comment: {
        type: DataTypes.STRING(255),
      },
    },
    {
      underscored: true,
    }
  );

  PayBackLog.associate = function (models) {
    PayBackLog.belongsTo(models.User, {
      foreignKey: "userId",
      as: "payBackLog",
    });
    PayBackLog.belongsTo(models.PayBackRequest, {
      foreignKey: "requestId",
      as: "requestData",
    });
  };
  return PayBackLog;
};
