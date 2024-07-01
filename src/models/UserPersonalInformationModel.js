module.exports = (sequelize, DataTypes) => {
  const UserPersonalInformation = sequelize.define(
    "UserPersonalInformation",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.ENUM("Mr", "Mrs", "Ms", "Miss", "Mstr"),
        defaultValue: "Mr",
      },
      gender: {
        type: DataTypes.ENUM("M", "F", "U"),
        defaultValue: "M",
      },
      dob: {
        type: DataTypes.DATE,
      },
      nationality: {
        type: DataTypes.STRING(255),
        defaultValue: "IN",
      },
      contry: {
        type: DataTypes.STRING(100),
      },
      state: {
        type: DataTypes.STRING(100),
      },
      city: {
        type: DataTypes.STRING(100),
      },
      currencyCode: {
        type: DataTypes.STRING(10),
      },
      panNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      passportNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      passportExpiryDate: {
        type: DataTypes.DATE,
      },
      passportCountry: {
        type: DataTypes.STRING(50),
      },
      longitude: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["passport_number"],
        },
        {
          unique: false,
          fields: ["type"],
        },
      ],
      underscored: true,
    }
  );

  UserPersonalInformation.associate = function (models) {
    UserPersonalInformation.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserPersonalInformation",
    });
  };
  return UserPersonalInformation;
};
