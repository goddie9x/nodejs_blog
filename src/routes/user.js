const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/stored/news', userController.news);
router.post('/stored/courses/handle-form-actions', userController.handleFormActions);
router.put('/stored/courses/:id', userController.update);
router.patch('/stored/courses/:id/restore', userController.restore);
router.delete('/stored/courses/:id/forceDelete', userController.forceDelete);
router.delete('/stored/courses/:id', userController.destroy);
router.get('/stored/courses', userController.courses);
router.get('/stored', userController.stored);
router.get('/trash', userController.trash);
router.get('/', userController.index);

module.exports = router;