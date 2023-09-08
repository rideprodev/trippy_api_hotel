module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define(
    "Faq",
    {
      question: {
        type: DataTypes.STRING(200),
      },
      answer: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );

  Faq.associate = function (models) {};
  return Faq;
};
