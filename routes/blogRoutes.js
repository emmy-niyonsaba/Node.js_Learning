const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog');


const router = express.Router();

router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((blogs) => {  
  res.render('home', { title: 'All Blogs', blogs: blogs });
});
})

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to save blog');
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      res.render('details', { title: blog.title, blog: [blog] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to fetch blog');
    });
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to delete blog');
    });
});
module.exports = router;