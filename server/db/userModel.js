const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
    trim: true,
    lowercase: true,
  }, //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
    trim: true,
  },
  role: {
    type: String,
    unique: false,
    trim: true,
  },
  firstName: {
    type: String,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    unique: false,
    trim: true,
  },
  tel: {
    type: Number,
    unique: false,
  },
});

// export UserSchema
module.exports = mongoose.model("Users", UserSchema);
