CREATE DATABASE IF NOT EXISTS db_portfolio;
USE  db_portfolio;
CREATE table IF NOT EXISTS users(
    ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
ALTER TABLE users MODIFY ID INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE users;
CREATE TABLE IF NOT EXISTS portfolios(
    ID_portfolios INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    heading TEXT,
    user_ID INT(11),
    PRIMARY KEY (ID_portfolios),
    CONSTRAINT user_portfolios FOREIGN KEY (user_ID) REFERENCES users(ID)
);
ALTER TABLE portfolios MODIFY ID_portfolios INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE portfolios;    
CREATE TABLE IF NOT EXISTS skills(
    ID_skills INT(11) NOT NULL AUTO_INCREMENT, 
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID_skills)
);
DESCRIBE skills;    
CREATE TABLE IF NOT EXISTS soft_skills(
    ID_soft_skills INT(11) NOT NULL AUTO_INCREMENT,
    level INT(11) NOT NULL DEFAULT 0,
    skill_ID INT(11),
    user_ID INT(11),
    PRIMARY KEY (ID_soft_skills),
    CONSTRAINT user_soft_skills FOREIGN KEY user_ID REFERENCES users(ID),
    CONSTRAINT soft_skills FOREIGN KEY skill_ID REFERENCES skills(ID_skills)
);
ALTER TABLE soft_skills MODIFY ID_soft_skills INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE soft_skills;    
CREATE TABLE IF NOT EXISTS technology(
     ID_technology INT(11) NOT NULL AUTO_INCREMENT, 
     technology VARCHAR(255) NOT NULL,
     PRIMARY KEY (ID_technology)
);
INSERT INTO technology (ID_technology, technology) VALUES ('1', 'HTML');
DESCRIBE technology;    
CREATE TABLE IF NOT EXISTS technologies(
    ID_technologies INT(11) NOT NULL AUTO_INCREMENT,
    level INT(11) NOT NULL DEFAULT 0,
    technology_ID INT(11),
    user_ID INT(11),
    PRIMARY KEY (ID_technologies),
    CONSTRAINT user_technologies FOREIGN KEY (user_ID) REFERENCES users(ID),
    CONSTRAINT technologies FOREIGN KEY (technology_ID) REFERENCES technology(ID_technology)
);
ALTER TABLE technologies MODIFY ID_technologies INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE  technologies;    
CREATE TABLE IF NOT EXISTS experiences(
    ID_experiences INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    block_text TEXT,
    user_ID INT(11),
    PRIMARY KEY (ID_experiences),
    CONSTRAINT user_experiences FOREIGN KEY (user_ID) REFERENCES users(ID)
);
ALTER TABLE experiences MODIFY ID_experiences INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE experiences;    
CREATE TABLE IF NOT EXISTS contact(
    ID_contact INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    block_text TEXT,
    user_ID INT(11),
    PRIMARY KEY (ID_contact),
    CONSTRAINT user_contact FOREIGN KEY (user_ID) REFERENCES users(ID)
);
ALTER TABLE contact MODIFY ID_contact INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE contact;  