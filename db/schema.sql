DROP DATABASE IF EXISTS llldb;
CREATE DATABASE llldb;

USE llldb;


CREATE TABLE users
(
        id int NOT NULL
        AUTO_INCREMENT,
name varchar
        (100) NOT NULL,
password varchar
        (100) NOT NULL,
coach TINYINT
        (1) NOT NULL,
team varchar
        (100) NOT NULL,
PRIMARY KEY
        (id)
);


        CREATE TABLE games
        (
                game_id int NOT NULL
                AUTO_INCREMENT,
                completed TINYINT
                (1) NOT NULL,
        in_progress TINYINT
                (1) NOT NULL,
location varchar
                (100) NOT NULL,
date DATE
NOT NULL,
home_team varchar
                (100) NOT NULL,
away_team varchar
                (100) NOT NULL,
PRIMARY KEY
                (game_id)
);


                CREATE TABLE scores
                (
                        game_id int
                        AUTO_INCREMENT NOT NULL,

date DATE
NOT NULL,

h1_score INT
                        (2),
v1_score INT
                        (2),
h2_score INT
                        (2),
v2_score INT
                        (2),
h3_score INT
                        (2),
v3_score INT
                        (2),
h4_score INT
                        (2),
v4_score INT
                        (2),
h5_score INT
                        (2),
v5_score INT
                        (2),
h6_score INT
                        (2),
v6_score INT
                        (2),
h_overtime INT
                        (2),
v_overtime INT
                        (2),
PRIMARY KEY
                        (game_id)
);


CREATE TABLE comments
(
        comment_id int NOT NULL
        AUTO_INCREMENT,

comment varchar
        (500) NOT NULL,
date DATE
NOT NULL,
team varchar
        (100) NOT NULL,
name varchar
        (100) NOT NULL,
PRIMARY KEY
        (comment_id)
);