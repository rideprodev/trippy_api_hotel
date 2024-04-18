module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define(
    "ActivityLog",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING(50),
      },
      transactionId: {
        type: DataTypes.INTEGER,
      },
      activityType: {
        type: DataTypes.STRING(255),
      },
      message: {
        type: DataTypes.STRING(255),
      },
    },
    {
      underscored: true,
    }
  );
  ActivityLog.associate = function (models) {
    ActivityLog.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });

    ActivityLog.belongsTo(models.User, {
      foreignKey: "adminId",
      onDelete: "cascade",
      as: "adminUser",
    });
  };
  return ActivityLog;
};
