module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define(
    "Cards",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      holderName: {
        type: DataTypes.STRING,
      },
      shortName: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      cardNumber: {
        type: DataTypes.STRING,
      },
      month: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.STRING,
      },
      encodedNumber: {
        type: DataTypes.STRING,
      },
      cardToken: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      isDefault: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
      },
      status: {
        type: DataTypes.ENUM("active", "deactive", "delete"),
        defaultValue: "active",
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["card_number"],
        },
        {
          unique: false,
          fields: ["status"],
        },
      ],
      underscored: true,
    }
  );
  Cards.associate = function (models) {
    Cards.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserData",
    });
  };
  return Cards;
};
