// Create web server for comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Set port
const port = 3000;

// Set static folder
app.use(express.static('public'));

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine
app.set('view engine', 'ejs');

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const comments = JSON.parse(data);
        res.render('comments', {comments: comments});
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./data/comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.redirect('/comments');
        });
    });
});

// Listen port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});var express = require('express');
var router = express.Router();
var fs = require('fs');

// GET comments from JSON file
router.get('/', function(req, res, next) {
  fs.readFile('./data/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
    res.json(JSON.parse(data));
  });
});

