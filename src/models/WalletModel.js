module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      balance: {
        type: DataTypes.DOUBLE(16, 2),
        defaultValue: 0.0,
      },
    },
    {
      underscored: true,
    }
  );
  Wallet.associate = function (models) {
    Wallet.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserData",
    });
  };
  return Wallet;
};
