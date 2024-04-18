module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING(50),
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
      },
      phoneNumberCountryCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 13],
        },
      },
      otp: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      isMobileVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userType: {
        type: DataTypes.ENUM("admin", "management", "user"),
        defaultValue: "user",
      },
      status: {
        type: DataTypes.ENUM("pending", "active", "inactive", "deleted"),
        defaultValue: "pending",
      },
      commission: {
        type: DataTypes.ENUM("relevant", "irrelevant"),
        defaultValue: "relevant",
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      current_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING(255),
        set(val) {
          let tmpStr = val;
          tmpStr = tmpStr.replace(/\\/g, "/");
          this.setDataValue("profilePicture", tmpStr);
        },
        allowNull: true,
      },
      passwordResetToken: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: false,
          fields: ["user_type"],
        },
        {
          unique: false,
          fields: ["status"],
        },
        {
          unique: false,
          fields: ["commission"],
        },
      ],
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "UserCreatedBy",
    });

    User.belongsTo(models.User, {
      foreignKey: "updatedBy",
      as: "UserUpdatedBy",
    });
    User.hasOne(models.UserPersonalInformation, {
      foreignKey: "userId",
    });

    User.hasOne(models.Wallet, {
      foreignKey: "userId",
      as: "walletInfo",
    });

    User.hasMany(models.Cards, {
      foreignKey: "userId",
      as: "cards",
    });

    User.hasMany(models.Transaction, {
      foreignKey: "userId",
      as: "transaction",
    });
  };
  return User;
};
