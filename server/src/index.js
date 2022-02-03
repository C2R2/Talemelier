require("dotenv").config()
// importing the dependencies
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { deleteAd, updateAd, deleteAllAds } = require("./database/ads")
const { startDatabase } = require("./database/mongo")
const { insertAd, getAds } = require("./database/ads")

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

const db = [{
  username: "admin", password: "$2b$10$OPsvN3WmUhasn.PeqiNl5.8E0quoOkIrAPAzkw.KyUdxGS6R030ni"
}]
// defining an endpoint to return all ads
app.get("/posts", authenticateToken, async (req, res) => {
  // res.send(await getAds())
  console.log(req.user.password)
  bcrypt.compare(req.user.password, db.filter(post => post.username === req.user.username)[0].password, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: result
      })
    }
    if (result) {
      console.log(result)
      res.json(db.filter(post => post.username === req.user.username))
    } else {
      return res.status(401).send({
        message: "Authentication failed"
      })
    }
  })
})

app.post("/posts", async (req, res) => {
  const newAd = req.body
  await insertAd(newAd)
  res.send({ message: "New ad inserted." })
})

// endpoint to delete an ad
app.delete("/posts/:id", async (req, res) => {
  await deleteAd(req.params.id)
  res.send({ message: "Ad removed." })
})

// endpoint to update an ad
app.put("/posts/:id", async (req, res) => {
  const updatedAd = req.body
  await updateAd(req.params.id, updatedAd)
  res.send({ message: "Ad updated." })
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

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertAd({
    title: "Hello, now from the in-memory database!"
  })

  // start the server
  app.listen(3001, async () => {
    console.log("listening on port 3001")
  })
})