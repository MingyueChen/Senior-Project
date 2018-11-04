const mongoose = require("mongoose");
const uniqueValidator = require ("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  confirmed: {type: Boolean}
  // confirmed: {type: Boolean, defaultValue: false }
});

adminSchema.plugin(uniqueValidator);

module.exports  = mongoose.model('Admin', adminSchema);


