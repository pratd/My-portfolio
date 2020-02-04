module.exports = {
    getAbout: function(con, callback) {
      con.query("SELECT * FROM experiences ", callback);
    },
    getSoftSkills: function(con, callback) {
        con.query("SELECT skill,soft_skills.level FROM users, soft_skills,skills WHERE users.ID=soft_skills.user_ID and soft_skills.skill_ID=skills.ID_skills", callback);
    },
    getTechnologies: function(con, callback) {
        con.query("SELECT technology.technology, technologies.level FROM users,technologies, technology WHERE users.ID=technologies.user_ID and technologies.technology_ID=technology.ID_technology", callback);
    },
    getExperience: function(con, callback) {
        con.query("SELECT title,block_text FROM users,experiences WHERE users.ID=experiences.user_ID ", callback);
    }
}   