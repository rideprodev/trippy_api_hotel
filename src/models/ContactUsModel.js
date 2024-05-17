module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    "ContactUs",
    {
      name: {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(100),
      },
      contactNumber: {
        type: DataTypes.STRING(20),
      },
      message: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      comment: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );
  ContactUs.associate = function (models) {};
  return ContactUs;
};
