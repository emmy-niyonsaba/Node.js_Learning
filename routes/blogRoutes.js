const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/', blogsController.blog_index);
router.get('/create', blogsController.blog_create_get);
router.post('/', blogsController.blog_create_post);
router.get('/:id', blogsController.blog_details);
router.delete('/:id', blogsController.blog_delete);

module.exports = router;