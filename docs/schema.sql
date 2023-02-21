\encoding UTF8

DROP TABLE WHEN EXISTS users;
DROP TABLE WHEN EXISTS users_movies;
DROP TABLE WHEN EXISTS movies;
DROP TABLE WHEN EXISTS movie_cast;
DROP TABLE WHEN EXISTS actors;
DROP TABLE WHEN EXISTS services_movies;
DROP TABLE WHEN EXISTS streaming_services;
DROP TABLE WHEN EXISTS regions;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_username TEXT NOT NULL,
  user_password TEXT NOT NULL,
  user_first_name TEXT NOT NULL,
  user_last_name TEXT NOT NULL,
  user_region_id INTEGER NOT NULL
);

CREATE TABLE users_movies (
  user_id INTEGER NOT NULL,
  movie_id INTEGER NOT NULL  
);

CREATE TABLE movies (
  movie_id SERIAL PRIMARY KEY,
  movie_name TEXT NOT NULL,
  movie_genre TEXT NOT NULL,
  movie_year DATE NOT NULL,
  movie_plot TEXT NOT NULL,
  movie_runtime_minutes INTEGER NOT NULL,
  movie_rating INTEGER NOT NULL
);

CREATE TABLE movie_cast (
  movie_id INTEGER NOT NULL,
  actor_id INTEGER NOT NULL  
);

CREATE TABLE actors (
  actor_id SERIAL PRIMARY KEY,
  actor_first_name TEXT NOT NULL,
  actor_last_name TEXT NOT NULL,
);

CREATE TABLE services_movies (
  movie_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL  
);

CREATE TABLE streaming_services (
  service_id SERIAL PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_url TEXT NOT NULL,
  service_region_id INTEGER NOT NULL,
);

CREATE TABLE regions (
  region_id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,
  region_description TEXT NOT NULL
);