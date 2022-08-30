const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "tipo",
    {
         Nombre: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
