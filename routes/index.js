var express = require('express');
var router = express.Router();
const Controller = require("../controller/Controller");
//get the routes
router.get("/", Controller.index);
router.get("/softSkills", Controller.softSkills);
router.get("/technologies", Controller.technologies);
router.get("/experience", Controller.experiences);
router.get("/contact", Controller.contact);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Portfolio' });
});

module.exports = router;
