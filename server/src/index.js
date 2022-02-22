const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const morgan = require("morgan")
const helmet = require("helmet")

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan("combined"))

const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017"
const dbName = "TalemelierDB"
let db

MongoClient.connect(url, (err, client) => {
    console.log("Connected successfully to server")
    db = client.db(dbName)
    if (err) throw err
})

//Authenticate User
app.post("/register", (req, res) => {
    //check if user already exists
    db.collection("users").findOne({ username: req.body.username })
        .then((result) => {
            if (result) {res.status(400).send("User already exists")} else {
                //hash password
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        //create user
                        const username = req.body.username
                        const password = hash
                        const user = { username, password }
                        db.collection("users").insertOne(user)
                            .then(result => res.status(201).json("User " + result.insertedId + " registered"))
                    }
                })
            }
        })
        .catch(err => res.status(500).json(err))
})

app.get("/users", (req, res) => {
    db.collection("users").find().toArray()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})

app.listen(3001, async () => {
    console.log("listening on port 3001")
})