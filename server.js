require('dotenv').config()
const express = require('express')
const path = require('path')
// const fetch = require('node-fetch')
// import fetch from 'node-fetch'
// import('node-fetch')
const PORT = process.env.PORT || 5163

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = await client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

const queryAllMovies = async function () {
  const sql = 'SELECT * FROM movies;'

  const results = await query(sql)
  return { movies: results }
}

const queryUserFavorites = async function (username, password) {
  //const sql = "SELECT * FROM favorites WHERE user_username = '" + req.body.username + "' AND user_password = '" + req.body.password + "';"
  // const sql = "SELECT * FROM favorites WHERE user_username = '" + username + "' AND user_password = '" + password + "';"

  const sql = "SELECT * FROM favorites"
  console.log(sql)

  const results = await query(sql)
  return { favorites: results }
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async function (req, res) {
    res.render('pages/index')
  })
  .get('/about', (req, res) => {
    res.render('pages/about')
  })
  .get('/health', async function (req, res) {
    const movies = await queryAllMovies() // Forgot () for function
    if (movies != null) {
      res.status(200).send('healthy') // Changed Healthy to healthy
    } else {
      res.status(500).send('Database connection has failed')
    }
  })
  .get('/list', async function (req, res) {
    const movies = await queryAllMovies()
    res.render('pages/list', movies)
  })
  .get('/search', (req, res) => {
    res.render('pages/search')
  })



  .post('/searchTitle', async function (req, res) {
    const title = req.body.title
    const apiKey = process.env.OMDb_API_KEY
    const apiKey2 = process.env.WATCHMODE_API_KEY
    const urlApi = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`


    const response = await fetch(urlApi, {
      method: 'GET',
      headers: {}
    })

    const result = await response.json()

    console.log(result)

    res.json({ Title: result.Title, Year: result.Year, Rated: result.Rated, Runtime: result.Runtime, Genre: result.Genre, Director: result.Director, Actors: result.Actors , Plot: result.Plot})


    
 

  })







  .get('/login', (req, res) => {
    res.render('pages/login')
  })

  .post('/user', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })

    try {
      // add validations
      const client = await pool.connect()

      const username = req.body.username
      const password = req.body.password
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const region = 1

      const insertSql = "INSERT INTO users (user_username, user_password, user_first_name, user_last_name, user_region_id) VALUES('" + username + "', '" + password + "', '" + firstName + "', '" + lastName + "', '" + region + "');"

      // INSERT INTO users (user_username, user_password, user_first_name, user_last_name, user_region_id) VALUES('test2', 'password3', 'Paul', 'Smith', 1);
      await client.query(insertSql)

      res.json({ ok: true })
      client.release()
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
  })
  .get('/AddFavs', (req, res) => {
    res.render('pages/AddFavs')
  })
  .post('/AddToFav', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })

    try {
      // add validations
      const client = await pool.connect()

      const username = req.body.username
      const password = req.body.password
      const movieName = req.body.movieName
      const movieDescription = req.body.movieDescription
      const serviceName = req.body.serviceName

      const insertFavsSql = "INSERT INTO favorites (user_username, user_password, movie_name, movie_description, service_name) VALUES('" + username + "', '" + password + "', '" + movieName + "', '" + movieDescription + "', '" + serviceName + "');"

      await client.query(insertFavsSql)

      res.json({ ok: true })
      client.release()
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
  })












  /*
  .get('/favorites', (req, res) => {
    res.render('pages/favorites')
  })
  */
  .get('/favorites', async function (req, res) {
    //const client = await pool.connect()

    const username = req.body.username
    const password = req.body.password


    const favorites = await queryUserFavorites(username, password)
    res.render('pages/favorites', favorites)
  })
  

  
  /*
  .get('/SearchFavs', async function (req, res){

    const client = await pool.connect()

    const username = req.body.username
    const password = req.body.password

    const searchFavsSql = "SELECT * FROM favorites WHERE user_username = '" + username + "' AND user_password = '" + password + "`;"

    const userFavorites = await client.query(searchFavsSql)

    res.render('pages/favorites', userFavorites)
  })
  
 
  .get('/SearchFavs', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })

    try {
      // add validations
      const client = await pool.connect()

      const username = req.body.username
      const password = req.body.password

      const searchFavsSql = "SELECT * FROM favorites WHERE user_username = '" + username + "' AND user_password = '" + password + "`;"

      await client.query(searchFavsSql)

      res.json({ ok: true })
      client.release()
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
  })

*/
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports = {
  query,
  queryAllMovies
} // function names
