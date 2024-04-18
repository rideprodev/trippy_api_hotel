module.exports = (sequelize, DataTypes) => {
  const Airlines = sequelize.define(
    "Airlines",
    {
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
      ],
      underscored: true,
    }
  );
  Airlines.associate = function (models) {
    Airlines.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "AirlinesCreatedBy",
    });

    Airlines.belongsTo(models.User, {
      foreignKey: "updatedBy",
      as: "AirlinesUpdatedBy",
    });
  };
  return Airlines;
};
