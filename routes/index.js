const express = require('express');
const router = express.Router();
const apiCtrl = require('../controllers/api');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/:url', apiCtrl.get);

module.exports = router;
