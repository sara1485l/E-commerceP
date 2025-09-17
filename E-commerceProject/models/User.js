const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String },
  username:  { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
