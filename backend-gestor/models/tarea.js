'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    iscomplete: DataTypes.BOOLEAN,
    activo: DataTypes.BOOLEAN,
    usuarioId: DataTypes.INTEGER
  });
  Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, { foreignKey: "usuarioId" });
  };
  return Tarea;
};