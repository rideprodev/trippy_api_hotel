module.exports = (sequelize, DataTypes) => {
  const UserMember = sequelize.define(
    "UserMember",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.ENUM("Mr", "Mrs", "Ms", "Miss", "Mstr"),
        defaultValue: "Mr",
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
      },
      gender: {
        type: DataTypes.ENUM("M", "F", "U"),
        defaultValue: "M",
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      status: {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        defaultValue: "active",
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
          fields: ["first_name"],
        },
        {
          unique: false,
          fields: ["status"],
        },
      ],
      underscored: true,
    }
  );

  UserMember.associate = function (models) {
    UserMember.belongsTo(models.User, {
      foreignKey: "userId",
      as: "UserByMember",
    });
  };
  return UserMember;
};
