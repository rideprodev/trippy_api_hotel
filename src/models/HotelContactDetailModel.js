module.exports = (sequelize, DataTypes) => {
  const HotelContact = sequelize.define(
    "HotelContact",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      fax: {
        type: DataTypes.STRING(50),
      },
      url: {
        type: DataTypes.STRING(200),
      },
      email: {
        type: DataTypes.STRING(50),
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
          fields: ["hotel_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelContact.associate = function (models) {};
  return HotelContact;
};
