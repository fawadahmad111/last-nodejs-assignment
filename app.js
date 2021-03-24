var express = require('express');
var path = require('path');
var db = require('./mongoosedb.js');
var Post = require('./models/post.js')

var app = express();

/* A template engine enables you to use static template files in your application.
//At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. */

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, '/public')));


app.get('/', function (req, res) {
  Post.find((err, posts) => {
    if (err) {
      console.log('Error getting post');
    }
    console.log(posts);
    res.render('index', {
      posts: posts
    })
  })

});

app.get('/about', function (req, res) {
  res.render('about')
});

app.get('/contact', function (req, res) {
  res.render('contact')
});


//simple adding document.
app.get('/create', (req, res) => {
  var post = new Post({
    title: 'Some title',
    body: 'some body',
    author: 'Aziz Qadeer',
    date: new Date()
  })

  post.save((err, post) => {
    if (err) {
      console.log(err);
    }
    console.log(post);
  })
  res.render('post', post)
})


// AHMAD FAWAD ASSIGNMENT START
//My Code-----------------CREATE-UPDATE-DELETE--[READ]-----------

// I am usig express json to parse the content of request body for my testing purpose
app.use(express.json())
// CREATE route
app.post('/post/create', async (req, res) => {
  const newPost = await Post.create(req.body);

  res.status(201).json(newPost)
});

// UPDATE route
app.put('/post/update/:postid', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.postid, req.body, { new: true });
  if (post) {
    res.status(201).json({
      'post after update': post
    })
  } else {
    res.status(201).json({
      Error: 'Ops... post id invalid or connection problem to the database'
    })
  }
});

// DELETE route
app.delete('/post/delete/:postid', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postid);

  res.status(201).json(`OMG you have deleted a post with ${post?.title} title`);
});

// READ ALL POSTS
app.get('/post', async (req, res) => {
  const posts = await Post.find(req.query);
  res.status(200).json(posts)
})

// READ route to read a specific post
app.get('/post/:postid', async (req, res) => {
  const post = await Post.findById(req.params.postid);
  res.status(200).json(post)
})
// AHMAD FAWAD ASSIGNMENT DONE

app.listen(8888, () => {
  console.log('listening on port 8888')
});