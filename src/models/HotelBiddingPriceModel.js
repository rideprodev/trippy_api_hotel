module.exports = (sequelize, DataTypes) => {
  const HotelBiddingPrices = sequelize.define(
    "HotelBiddingPrices",
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

  HotelBiddingPrices.associate = function (models) {
    HotelBiddingPrices.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userData",
    });
    HotelBiddingPrices.belongsTo(models.HotelBidding, {
      foreignKey: "biddingId",
      as: "biddingDatas",
    });
  };
  return HotelBiddingPrices;
};
