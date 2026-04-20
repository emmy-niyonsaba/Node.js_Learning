const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();
const app = express();

const port = 3000;

const dbURI ='mongodb+srv://emmyson:emmy1234@cluster0.fgvybye.mongodb.net/mydb?retryWrites=true&w=majority';
if (!dbURI) {
  console.error('Missing MONGODB_URI. Create a .env file (see .env.example) with your MongoDB connection string.');
  process.exit(1);
}
mongoose.connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at port:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
// this way to set the public foler for node while it is running 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((blogs) => {  
  res.render('home', { title: 'All Blogs', blogs: blogs });
});
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blogs router
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
app.post('/blogs', (req, res) => {
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

app.get('/blogs/:id', (req, res) => {
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


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});