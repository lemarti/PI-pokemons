const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Vida: { type: DataTypes.INTEGER },
      Ataque: { type: DataTypes.INTEGER },
      Defensa: { type: DataTypes.INTEGER },
      Velocidad: { type: DataTypes.INTEGER },
      Altura: { type: DataTypes.INTEGER },
      Peso: { type: DataTypes.INTEGER, allowNull: false },
      Imagen: { type: DataTypes.STRING },
      CreadoenDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
