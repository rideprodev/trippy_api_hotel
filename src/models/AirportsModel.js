module.exports = (sequelize, DataTypes) => {
  const Airports = sequelize.define(
    "Airports",
    {
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cityCode: {
        type: DataTypes.STRING(10),
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["name"],
        },
        {
          unique: false,
          fields: ["code"],
        },
        {
          unique: false,
          fields: ["city"],
        },
      ],
      underscored: true,
    }
  );
  Airports.associate = function (models) {
    Airports.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "AirportsCreatedBy",
    });

    Airports.belongsTo(models.User, {
      foreignKey: "updatedBy",
      as: "AirportsUpdatedBy",
    });
  };
  return Airports;
};
