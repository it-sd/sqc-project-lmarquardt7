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

  .get('/login', (req, res) => {
    res.render('pages/login')
  })

  .post('/user', async function (req, res) {
    // Your code here //////////////////////////////////////
    res.set({ 'Content-Type': 'application/json' })

    try {
      // This is where we will eventually, I assume, save password to database
      // send back success true if try works
      const client = await pool.connect()

      const username = req.body.username
      const password = req.body.password
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const region = 1

      // const insertSql = 'INSERT INTO users (user_username, user_password, user_first_name, user_last_name, user_region_id) VALUES (' + username + ', ' + password + ', ' + firstName + ', ' + lastName + ', ' + region + ');'

      const insertSql = `INSERT INTO users (user_username, user_password, user_first_name, user_last_name, user_region_id) VALUES ($1::TEXT, $2::TEXT, $3::TEXT, $4::TEXT, $5::TEXT);`

      console.log(insertSql, [username, password, firstName, lastName, region])
      await client.query(insertSql)

      res.json({ ok: true })
      client.release()
    } catch (error) {
      // send back success false if catch runs

      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
    // End of your code ////////////////////////////////////
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports = {
  query,
  queryAllMovies
} // function names
