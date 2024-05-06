module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE(16, 2),
        defaultValue: 0.0,
      },
      holderName: {
        type: DataTypes.STRING(50),
      },
      accountNumber: {
        type: DataTypes.STRING(20),
      },
      bankName: {
        type: DataTypes.STRING(100),
      },
      ifscBsbCode: {
        type: DataTypes.STRING(50),
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
