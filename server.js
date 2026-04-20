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

  app.get('/all-blogs', (req, res) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send('Database not connected. Check MONGODB_URI and MongoDB network access.');
    }
    Blog.find()
      .then((blogs) => {
        res.send(blogs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to fetch blogs');
      });
  });


  app.get('/single-blog', (req, res) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send('Database not connected. Check MONGODB_URI and MongoDB network access.');
    }
    Blog.findById('69e5e64ee428334398bc5e60') 
      .then((blog) => {
        res.send(blog);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to fetch blog');
      })
      });









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

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});