const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
  

//array of blogs

const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
]
app.get('/', (req, res) => {
  res.render('home', { title: 'Home', blogs: blogs });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});