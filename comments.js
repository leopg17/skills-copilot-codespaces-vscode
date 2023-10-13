// Create web server for comments

var express = require('express');
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

// POST comment
router.post('/', function(req, res, next) {
  fs.readFile('./data/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),