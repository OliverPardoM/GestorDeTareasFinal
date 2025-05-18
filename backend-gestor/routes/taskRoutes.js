const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

router.use(authMiddleware);

router.post('/', taskController.crearTarea);
router.get('/', taskController.obtenerTareas);
router.get('/:id', taskController.obtenerTareaPorId);
router.put('/:id', taskController.actualizarTarea);
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;