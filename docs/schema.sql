\encoding UTF8

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_movies;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS movie_cast;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS services_movies;
DROP TABLE IF EXISTS streaming_services;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS favorites;

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
  movie_year TEXT NOT NULL,
  movie_plot TEXT NOT NULL,
  movie_runtime_minutes INTEGER NOT NULL,
  movie_rating TEXT NOT NULL
);

CREATE TABLE movie_cast (
  movie_id INTEGER NOT NULL,
  actor_id INTEGER NOT NULL  
);

CREATE TABLE actors (
  actor_id SERIAL PRIMARY KEY,
  actor_first_name TEXT NOT NULL,
  actor_last_name TEXT NOT NULL
);

CREATE TABLE services_movies (
  movie_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL  
);

CREATE TABLE streaming_services (
  service_id SERIAL PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_url TEXT NOT NULL,
  service_region_id INTEGER NOT NULL
);

CREATE TABLE regions (
  region_id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,
  region_description TEXT NOT NULL
);

CREATE TABLE favorites(
  favorite_id SERIAL PRIMARY KEY,
  user_username TEXT NOT NULL,
  user_password TEXT NOT NULL,
  movie_name TEXT NOT NULL,
  movie_description TEXT NOT NULL,
  service_name TEXT NOT NULL
);

INSERT INTO favorites (user_username, user_password, movie_name, movie_description, service_name) VALUES ('lmarquardt7', 'Password01', 'Hackers', 'Hackers are blamed for making a virus that will capsize five oil tankers.', 'Hulu');
INSERT INTO favorites (user_username, user_password, movie_name, movie_description, service_name) VALUES ('lmarquardt7', 'Password01', 'Jobs', 'The story of Steve Jobs ascension from college dropout into one of the most revered creative entrepreneurs of the 20th century.', 'Netflix');
INSERT INTO favorites (user_username, user_password, movie_name, movie_description, service_name) VALUES ('lmarquardt7', 'Password01', 'The Social Network', 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.', 'Disney+');

INSERT INTO movies (movie_name, movie_genre, movie_year, movie_plot, movie_runtime_minutes, movie_rating) VALUES ('Hackers', 'Crime, Drama, Romance', '1995', 'Hackers are blamed for making a virus that will capsize five oil tankers.', '105', '6.2');
INSERT INTO movies (movie_name, movie_genre, movie_year, movie_plot, movie_runtime_minutes, movie_rating) VALUES ('Jobs', 'Biography, Drama', '2013', 'The story of Steve Jobs ascension from college dropout into one of the most revered creative entrepreneurs of the 20th century.', '128', '6.0');
INSERT INTO movies (movie_name, movie_genre, movie_year, movie_plot, movie_runtime_minutes, movie_rating) VALUES ('The Social Network', 'Biography, Drama', '2010', 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.', '120', '7.8');


