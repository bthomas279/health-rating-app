CREATE DATABASE student_health_database;
USE student_health_database;

--User table
CREATE TABLE user (
    user_id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

--User habits table
CREATE TABLE user_habits (
    habit_id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id integer FOREIGN KEY NOT NULL,
    sleep_hours FLOAT NULL,
    tv_hours FLOAT NULL,
    diet_quality VARCHAR(45) NULL,
    exercise_frequency_weekly integer NULL,
    daily_study_hours FLOAT NULL,
    social_media_hours FLOAT NULL, 
    created_at DATE NOT NULL
)

CREATE TABLE mental_health_rating (
    score_id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_habits_id INT NOT NULL,
    mental_health_rating integer NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()

)