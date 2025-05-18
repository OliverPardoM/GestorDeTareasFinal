const { Tarea } = require('../models');
const { Op } = require('sequelize');

// Crear tarea
exports.crearTarea = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const tarea = await Tarea.create({
      title,
      description,
      status: 'pendiente',
      iscomplete: false,
      activo: true,
      dueDate,
      usuarioId: req.usuario.id
    });

    res.status(201).json({ message: 'Tarea creada exitosamente', task: tarea });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Obtener todas las tareas del usuario y filtros
exports.obtenerTareas = async (req, res) => {
    try {
      const { status, search, dueDate, from, to } = req.query;
      const filtros = {
        usuarioId: req.usuario.id
      };
  
      if (status) filtros.status = status;
  
      if (search) {
        filtros[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }
  
      if (dueDate) {
        filtros.dueDate = dueDate; // fecha exacta
      }
  
      if (from || to) {
        filtros.dueDate = {
          ...(from && { [Op.gte]: from }),
          ...(to && { [Op.lte]: to })
        };
      }
  
      const tareas = await Tarea.findAll({ where: filtros });
      res.json(tareas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Obtener una tarea específica
exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({
      where: {
        id: req.params.id,
        usuarioId: req.usuario.id
      }
    });

    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la tarea' });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
      const tarea = await Tarea.findOne({
        where: {
          id: req.params.id,
          usuarioId: req.usuario.id
        }
      });
  
      if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      // Si la tarea ya está completada, no se puede modificar
      if (tarea.status === 'completada') {
        return res.status(400).json({ error: 'No se puede modificar una tarea completada' });
      }
  
      const nuevoEstado = req.body.status;
  
      // Validar transiciones de estado si se intenta cambiar el status
      if (nuevoEstado && nuevoEstado !== tarea.status) {
        if (tarea.status === 'pendiente' && nuevoEstado !== 'en progreso') {
          return res.status(400).json({ error: 'Solo se puede cambiar de "pendiente" a "en progreso"' });
        }
  
        if (tarea.status === 'en progreso' && nuevoEstado === 'pendiente') {
          return res.status(400).json({ error: 'No se puede volver de "en progreso" a "pendiente"' });
        }
  
        if (tarea.status !== 'en progreso' && nuevoEstado === 'completada') {
          return res.status(400).json({ error: 'Solo se puede completar una tarea que está en progreso' });
        }
      }
  
      // Actualizar campos permitidos
      const camposPermitidos = ['title', 'description', 'dueDate', 'status'];
      for (const campo in req.body) {
        if (camposPermitidos.includes(campo)) {
          tarea[campo] = req.body[campo];
        }
      }
  
      await tarea.save();
  
      res.json({ message: 'Tarea actualizada correctamente', task: tarea });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};
  
// Eliminar tarea solo si está completada
exports.eliminarTarea = async (req, res) => {
    try {
      const tarea = await Tarea.findOne({
        where: {
          id: req.params.id,
          usuarioId: req.usuario.id
        }
      });
  
      if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      // Validar que la tarea esté completada antes de eliminar
      if (tarea.status !== 'completada') {
        return res.status(400).json({ error: 'Solo se pueden eliminar tareas completadas' });
      }
  
      await tarea.destroy();
      res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};