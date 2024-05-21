module.exports = (sequelize, DataTypes) => {
  const HotelImage = sequelize.define(
    "HotelImage",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
      },
      imageCaption: {
        type: DataTypes.STRING(200),
      },
      mainImage: {
        type: DataTypes.STRING(10),
      },
      imageType: {
        type: DataTypes.STRING(10),
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
        {
          unique: false,
          fields: ["main_image"],
        },
      ],
      underscored: true,
    }
  );
  HotelImage.associate = function (models) {};
  return HotelImage;
};
