require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const morgan = require("morgan")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan("combined"))
app.use(cookieParser())

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
                        const role = req.body.role
                        const user = { username, password, role }
                        db.collection("users").insertOne(user)
                            .then(result => res.status(201).json("User " + result.insertedId + " registered"))
                    }
                })
            }
        })
        .catch(err => res.status(500).json(err))
})

//Login user
app.post("/login", (req, res) => {
    //check if user exists
    db.collection("users").findOne({ username: req.body.username })
        .then(dbResult => {
            if (dbResult) {
                //check if password is correct
                bcrypt.compare(req.body.password, dbResult.password, (err, bcryptResult) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else if (bcryptResult) {
                        //create token
                        const user = {
                            username: dbResult.username, role: dbResult.role
                        }
                        const token = jwt.sign({
                            user
                        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
                        res.cookie("token", token, { httpOnly: true })
                        res.status(200).json({
                            msg: "Authentication successful", token, user
                        })
                    } else {
                        //password incorrect
                        res.status(401).json({
                            msg: "Password incorrect"
                        })
                    }
                })
            } else {
                //user does not exist
                res.status(401).json({
                    msg: "User does not exist"
                })
            }
        })
        .catch(err => res.status(500).json(err))
})

app.get("/users", authenticateToken, (req, res) => {
    db.collection("users").find().toArray()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})

function authenticateToken (req, res, next) {
    const authHeader = "Bearer " + req.cookies.token
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).json({
            msg: "Token is not valid. Please login again"
        })
        if (user.role !== "admin") return res.status(403).json({
            msg: "You are not authorized to view this page"
        })
        req.user = user
        next()
    })
}

app.listen(3001, async () => {
    console.log("listening on port 3001")
})