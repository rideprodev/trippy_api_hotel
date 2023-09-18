module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      hotelCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      hotelName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cityCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      destinationCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      address: {
        type: DataTypes.STRING(255),
      },
      postalCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      StarCategory: {
        type: DataTypes.STRING(255),
      },
      latitude: {
        type: DataTypes.STRING(255),
      },
      logitude: {
        type: DataTypes.STRING(255),
      },
      accommodationType: {
        type: DataTypes.STRING(255),
      },
      accommodationTypeSubName: {
        type: DataTypes.STRING(255),
      },
      ChainName: {
        type: DataTypes.STRING(255),
      },
      featured: {
        type: DataTypes.ENUM("Y", "N"),
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
          fields: ["city_code"],
        },
        {
          unique: false,
          fields: ["destination_code"],
        },

        {
          unique: false,
          fields: ["country_code"],
        },
      ],
      underscored: true,
    }
  );
  Hotel.associate = function (models) {
    // Hotel.hasMany(models.HotelImage, {
    //   foreignKey: "hotelCode",
    // });
    // Hotel.belongsTo(models.HotelImage, {
    //   targetKey: "hotelCode",
    //   foreignKey: "hotelCode",
    //   as: "images",
    // });
  };
  return Hotel;
};
