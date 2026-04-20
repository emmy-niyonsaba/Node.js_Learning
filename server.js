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

app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');



const blogs = [
  { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
]
app.get('/add-blog', (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).send('Database not connected. Check MONGODB_URI and MongoDB network access.');
  }

  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to save blog');
    });
  });
app.get('/', (req, res) => {
  res.render('home', { title: 'Home', blogs: blogs });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});