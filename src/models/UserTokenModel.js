module.exports = (sequelize, DataTypes) => {
  const UserTokens = sequelize.define(
    "UserToken",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      accessToken: {
        type: DataTypes.TEXT,
      },
      firebaseToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deviceType: {
        type: DataTypes.ENUM("web", "ios", "android"),
      },
      appVersion: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  UserTokens.associate = function (models) {
    UserTokens.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };
  return UserTokens;
};
