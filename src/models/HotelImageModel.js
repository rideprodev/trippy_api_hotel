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
        allowNull: false,
      },
      imageCaption: {
        type: DataTypes.STRING(50),
      },
      mainImage: {
        type: DataTypes.ENUM("Y", "N"),
        defaultValue: "Y",
      },
      imageType: {
        type: DataTypes.ENUM("R", "N"),
        defaultValue: null,
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
  HotelImage.associate = function (models) {};
  return HotelImage;
};
