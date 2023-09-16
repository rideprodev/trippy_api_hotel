module.exports = (sequelize, DataTypes) => {
  const HotelLanguage = sequelize.define(
    "HotelLanguage",
    {
      languageCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
          fields: ["language_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelLanguage.associate = function (models) {};
  return HotelLanguage;
};
