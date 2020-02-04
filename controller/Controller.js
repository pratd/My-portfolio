const data = require("../models/data");

module.exports = {
    index: function(req, res) {
        data.getAbout(req.con, function(err, rows) {
            res.render("about");
        })
    },
    softSkills: function(req, res) {
        data.getSoftSkills(req.con, function(err, rows) {
            res.render("softSkills", { data: rows });
        })
    },
    technologies: function(req, res) {
        data.getTechnologies(req.con, function(err, rows) {
        res.render("technologies", { data: rows });
        })
    },
    experiences: function(req, res) {
        data.getExperience(req.con, function(err, rows) {
        res.render("experience", { data: rows });
        })
    },
    contact: function(req, res) {
        res.render("contact");
    }
}