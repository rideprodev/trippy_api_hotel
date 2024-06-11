module.exports = (sequelize, DataTypes) => {
  const HotelTop10k = sequelize.define(
    "HotelTop10k",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      hotelName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      cityCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      locationCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(255),
      },
      StarCategory: {
        type: DataTypes.DOUBLE(4, 2),
      },
      address: {
        type: DataTypes.STRING(255),
      },
      postalCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING(10),
      },
      logitude: {
        type: DataTypes.STRING(10),
      },
      accommodationType: {
        type: DataTypes.STRING(10),
      },
      accommodationTypeSubName: {
        type: DataTypes.STRING(50),
      },
      ChainName: {
        type: DataTypes.STRING(10),
      },
      featured: {
        type: DataTypes.STRING(10),
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
        {
          unique: false,
          fields: ["hotel_name"],
        },
        {
          unique: false,
          fields: ["city_code"],
        },
        {
          unique: false,
          fields: ["location_code"],
        },
        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  HotelTop10k.associate = function (models) {};
  return HotelTop10k;
};
