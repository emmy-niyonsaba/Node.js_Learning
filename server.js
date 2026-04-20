const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

try {
  require('dotenv').config();
} catch {
  // dotenv is optional; app can still run with environment variables set externally.
}
const app = express();

const port = 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://emmyson:emmy1234@cluster0.fgvybye.mongodb.net/mydb?retryWrites=true&w=majority';
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Using the fallback connection string in server.js.');
}
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
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blogs router
app.use('/blogs',blogRoutes);


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});