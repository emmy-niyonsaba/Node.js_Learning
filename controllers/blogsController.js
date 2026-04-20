const Blog = require('../models/blog');

const blog_index = (req, res) => {
	Blog.find().sort({ createdAt: -1 })
		.then((blogs) => {
			res.render('home', { title: 'All Blogs', blogs: blogs });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Failed to fetch blogs');
		});
};

const blog_create_get = (req, res) => {
	res.render('create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
	const blog = new Blog(req.body);
	blog.save()
		.then(() => {
			res.redirect('/blogs');
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Failed to save blog');
		});
};

const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((blog) => {
			if (!blog) {
				return res.status(404).render('404', { title: '404' });
			}
			res.render('details', { title: blog.title, blog: [blog] });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Failed to fetch blog');
		});
};

const blog_delete = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then(() => {
			res.json({ redirect: '/blogs' });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Failed to delete blog');
		});
};

module.exports = {
	blog_index,
	blog_create_get,
	blog_create_post,
	blog_details,
	blog_delete,
};
