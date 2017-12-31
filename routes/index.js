var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/index.html');
});

router.get('/index.html', (req, res, next) => {
  res.render('root/index', { title: '网站标题' });
});

module.exports = router;
