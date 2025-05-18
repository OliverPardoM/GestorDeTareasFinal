'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Usuarios',
    hooks: {
      beforeCreate: async (usuario, options) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Tarea, { foreignKey: "usuarioId" });
  };

  Usuario.prototype.validarPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return Usuario;
};
