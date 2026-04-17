const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3000;
// 
const dbURI = 'mongodb+srv://emmyson:<emmy123!@#>@cluster0.fgvybye.mongodb.net/';
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at port:${port}`);
    });
  })
  // 
  .catch((err) => {
    console.log(err);
  });

app.use(express.static('public'));

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



app
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});




app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});