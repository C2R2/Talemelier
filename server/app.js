const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// require database connection
const dbConnect = require("./db/dbConnect")
const User = require("./db/userModel")
const Product = require("./db/productModel")
const auth = require("./auth")
const port = process.env.PORT || 3000

// execute database connection
dbConnect()

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    next()
})

// body parser configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" })
    next()
})

// register endpoint
app.post("/register", (request, response) => {
    User.findOne({ email: request.body.email }).then((user) => {
        if (user) {
            response.status(208).json({ message: "User already exists" })
        } else {
            // hash the password
            bcrypt.hash(request.body.password, 12).then((hashedPassword) => {
                // create a new user instance and collect the data
                const user = new User({
                    email: request.body.email, password: hashedPassword, role: "user"
                })

                // save the new user
                user.save()
                    // return success if the new user is added to the database successfully
                    .then((result) => {
                        response.status(201).send({
                            message: "User Created Successfully", result
                        })
                    })
                    // catch error if the new user wasn't added successfully to the database
                    .catch((error) => {
                        response.status(500).send({
                            message: "Error creating user", error
                        })
                    })
            })
                // catch error if the password hash isn't successful
                .catch((e) => {
                    response.status(500).send({
                        message: "Password was not hashed successfully", e
                    })
                })
        }
    })
})

// login endpoint
app.post("/login", (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })

        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(request.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {

                    // check if password matches
                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: "Passwords does not match", error
                        })
                    }
                    //   create JWT token
                    const token = jwt.sign({
                        userId: user._id, userEmail: user.email, userRole: user.role
                    }, "RANDOM-TOKEN", { expiresIn: "24h" })

                    //   return success response
                    response.status(200).send({
                        message: "Login Successful", email: user.email, token
                    })
                })
                // catch error if password do not match
                .catch((error) => {
                    response.status(400).send({
                        message: "Passwords does not match", error
                    })
                })
        })
        // catch error if email does not exist
        .catch((e) => {
            response.status(404).send({
                message: "Email not found", e
            })
        })
})

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" })
})

// authentication endpoint
app.get("/users", auth, (request, response) => {
    User.find()
        .then(result => response.status(200).json(result))
        .catch(err => response.status(500).json(err))
})

app.get("/users/:id", auth, (request, response) => {
    User.findById(request.params.id)
        .then(result => response.status(200).json(result))
        .catch(err => response.status(500).json(err))
})

app.delete("/users/:id", auth, (request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(result => response.status(200).json(result))
        .catch(err => response.status(500).json(err))
})

app.get("/products", (request, response) => {

    Product.find()
        .then(result => response.status(200).json(result))
        .catch(err => response.status(500).json(err))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})