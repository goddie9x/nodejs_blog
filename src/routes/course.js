const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.get('/:detail', courseController.detail);
router.get('/', courseController.index);

module.exports = router;