module.exports = (sequelize, DataTypes) => {
  const BiddingPrices = sequelize.define(
    "BiddingPrices",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      biddingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latestPrice: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  BiddingPrices.associate = function (models) {
    BiddingPrices.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    BiddingPrices.belongsTo(models.Bidding, {
      foreignKey: "biddingId",
      as: "biddingDatas",
    });
  };
  return BiddingPrices;
};
