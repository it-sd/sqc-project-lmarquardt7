require('dotenv').config()
const express = require('express')
const path = require('path')
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

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports = {
  query,
  queryAllMovies
} // function names
