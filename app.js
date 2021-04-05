var express = require('express');
var path = require('path');
var db = require('./mongoosedb.js');
var Post = require('./models/post.js');
var app = express();
//my requires
// const morgan = require('morgan');
// app.use(morgan('tiny'));

// My codes--------------------------------------------
const assigmentCrudRouter = require('./assigmentCrudRouter');


/* A template engine enables you to use static template files in your application.
//At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. */
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));




// My router built to handle and serve required routes instructed in the assignment and render pages accordingly
app.use('/assignment', assigmentCrudRouter);


app.get('/', function (req, res) {
  Post.find((err, posts) => {
    if (err) {
      console.log('Error getting post');
    }
    res.render('index', {
      posts: posts
    })
  })

});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contact', function (req, res) {
  res.render('contact');
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



app.listen(9090, () => {
  console.log('listening on port 9090')
});