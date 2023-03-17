const { queryAllMovies } = require('../server.js')
const { queryUserFavorites } = require('../server.js')

describe('server', function () {
  const baseUrl = 'http://localhost:5163'
  const shouldBeAbove200 = async function (route) {
    it('should be above 200', async function () {
      const url = new URL(route, baseUrl)
      const res = await fetch(url)
      expect(res.status).toBeGreaterThanOrEqual(200)
    }, 10000)
  }
  const shouldBeLessThan399 = async function (route) {
    it('should be below 399', async function () {
      const url = new URL(route, baseUrl)
      const res = await fetch(url)
      expect(res.status).toBeLessThanOrEqual(399)
    }, 10000)
  }
  describe("GET '/health'", function () {
    shouldBeAbove200('/health')
  })
  describe("GET '/'", function () {
    shouldBeAbove200('/')
  })
  describe("GET '/about'", function () {
    shouldBeAbove200('/about')
  })
  describe("GET '/list'", function () {
    shouldBeAbove200('/list')
  })
  describe("GET '/search'", function () {
    shouldBeAbove200('/search')
  })
  describe("GET '/login'", function () {
    shouldBeAbove200('/login')
  })
  describe("GET '/services'", function () {
    shouldBeAbove200('/services')
  })
  describe("GET '/AddFavs'", function () {
    shouldBeAbove200('/AddFavs')
  })
  describe("GET '/favorites'", function () {
    shouldBeAbove200('/favorites')
  })
  describe("GET '/health'", function () {
    shouldBeLessThan399('/health')
  })
  describe("GET '/'", function () {
    shouldBeLessThan399('/')
  })
  describe("GET '/about'", function () {
    shouldBeLessThan399('/about')
  })
  describe("GET '/list'", function () {
    shouldBeLessThan399('/list')
  })
  describe("GET '/search'", function () {
    shouldBeLessThan399('/search')
  })
  describe("GET '/login'", function () {
    shouldBeLessThan399('/login')
  })
  describe("GET '/services'", function () {
    shouldBeLessThan399('/services')
  })
  describe("GET '/AddFavs'", function () {
    shouldBeLessThan399('/AddFavs')
  })
  describe("GET '/favorites'", function () {
    shouldBeLessThan399('/favorites')
  })
  describe("POST '/user'", function () {
    const url = new URL('/user', baseUrl)
    it('should accept valid user information', async function () {
      const data = {
        username: 'userName1',
        password: 'Password1',
        firstName: 'John',
        lastName: 'Smith',
        region: 1
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeTrue()

      const results = await response.json()
      expect(results.ok).toBeTrue()
    })
    it('should reject invalid user information', async function () {
      const data = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        region: 1
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeFalse()
    })
  })
  describe("POST '/searchTitle'", function () {
    const url = new URL('/searchTitle', baseUrl)
    it('should accept valid title', async function () {
      const data = {
        title: 'Hackers'
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeTrue()
    })
  })
  describe("POST '/searchServices'", function () {
    const url = new URL('/searchServices', baseUrl)
    it('should accept valid ID', async function () {
      const data = {
        id: 'tt0113243'
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeTrue()
    })
  })
  describe("POST '/AddToFav'", function () {
    const url = new URL('/AddToFav', baseUrl)
    it('should accept valid information and save', async function () {
      const data = {
        username: 'Username',
        password: 'Password',
        movieName: 'MovieName',
        movieDescription: 'MovieDescription',
        serviceName: 'ServiceName'
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeTrue()
    })
    it('should reject invalid information', async function () {
      const data = {
        username: '',
        password: '',
        movieName: '',
        movieDescription: '',
        serviceName: ''
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeFalse()
    })
  })
  describe('queryAllMovies', function () {
    it('should return results', async function () {
      const results = await queryAllMovies()
      expect(results).toBeDefined()
      expect(results.movies).toBeDefined()
      expect(results.movies.length).toBeGreaterThanOrEqual(0)
    })
  })
  describe('queryUserFavorites', function () {
    it('should return results', async function () {
      const results = await queryUserFavorites()
      expect(results).toBeDefined()
      expect(results.favorites).toBeDefined()
      expect(results.favorites.length).toBeGreaterThanOrEqual(0)
    })
  })
})
