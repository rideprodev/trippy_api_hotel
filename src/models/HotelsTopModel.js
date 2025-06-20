module.exports = (sequelize, DataTypes) => {
  const HotelTop10k = sequelize.define(
    "HotelTop10k",
    {
      hotelCode: {
        type: DataTypes.INTEGER(30),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      hotelName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      cityCode: {
        type: DataTypes.INTEGER(30),
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
      ordering: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
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
          type: "FULLTEXT",
          fields: ["hotel_name"],
        },
        {
          unique: false,
          fields: ["accommodation_type_sub_name"],
        },
        { unique: false, fields: ["Star_category"] },
      ],
      underscored: true,
    }
  );
  HotelTop10k.associate = function (models) {
    HotelTop10k.belongsTo(models.HotelCity, {
      foreignKey: "cityCode",
      as: "cityData",
    });
    HotelTop10k.belongsTo(models.HotelCountry, {
      foreignKey: "countryCode",
      as: "countryData",
    });
    HotelTop10k.hasOne(models.HotelImage, {
      foreignKey: "hotelCode",
      as: "image",
    });
  };
  return HotelTop10k;
};
