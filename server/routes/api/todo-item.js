const express = require('express');
const router = express.Router();
const todoItemController = require('../../controllers/todoItemController');
const authenticateMiddleware = require('../../middleware/authMiddleware');
const todoItemModel = require('../../models/todo-item.model');

// Index route
router.get('', authenticateMiddleware, todoItemController.index);

// Store route
router.post('', authenticateMiddleware, todoItemController.store);

// Update route
router.patch('/:id', authenticateMiddleware, todoItemController.update);

// Update todo item status (Put or Patch)
router.put('/:id/status', authenticateMiddleware, todoItemController.updateStatus);
router.patch('/:id/status', authenticateMiddleware, todoItemController.updateStatus);

module.exports = router;
