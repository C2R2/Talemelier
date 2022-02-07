require("dotenv").config()
// importing the dependencies
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const users = require("./user.json")

const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017"
const dbName = "TalemelierDB"
let db

MongoClient.connect(url, (err, client) => {
  console.log("Connected successfully to server")
  db = client.db(dbName)
  if (err) throw err
})

// defining the Express app
const app = express()

// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan("combined"))

app.use(express.json())

// let db = [{
//   username: "admin", password: "$2b$10$OPsvN3WmUhasn.PeqiNl5.8E0quoOkIrAPAzkw.KyUdxGS6R030ni"
// }]

app.get("/users", (req, res) => {
  db.collection("users").find({}).toArray()
    .then(docs => res.status(200).json(docs))
    .catch(err => {
      console.log(err)
      throw err
    })
})

app.post("/register", (req, res) => {
  //Authenticate User
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: req.body.password
      })
    } else {
      const username = req.body.username
      const password = hash
      const user = { username, password }
      db.collection("users").insertOne(user)
        .then(result => res.status(201).json(result))
        .catch(err => {
          console.log(err)
          throw err
        })
      // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      // console.log(hash)
      // res.json({ accessToken: accessToken })
    }
  })
})
app.delete("/users/:id", (req, res) => {
  db.collection("users").deleteOne({ _id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      throw err
    })
})

// defining an endpoint to return all ads
app.get("/posts", authenticateToken, async (req, res) => {
  bcrypt.compare(req.user.password, db.filter(post => post.username === req.user.username)[0].password, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: result
      })
    }
    if (result) {
      res.json(db.filter(post => post.username === req.user.username))
    } else {
      return res.status(401).send({
        message: "Authentication failed"
      })
    }
  })
})

app.post("/login", (req, res) => {
  //Authenticate User
  // bcrypt.hash(req.body.password, 10, (err, hash) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err
  //     })
  //   } else {
  //     const username = req.body.username
  //     const password = hash
  //     const user = { username, password }
  //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  //     console.log(hash)
  //     res.json({ accessToken: accessToken })
  //   }
  // })

  //log user
  const user = { username: req.body.username, password: req.body.password }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

function authenticateToken (req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })

}

// start the server
app.listen(3001, async () => {
  console.log("listening on port 3001")
})
