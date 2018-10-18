const mongoose = require('mongoose');

// create a blueprint of how the data should look like
// schema is just a bluprint, not the thing we want to work with in our code
const employeeInfoSchema = mongoose.Schema({
  // schema configuration --- define the fields and the types of data we want to store
  // typescript: string with lowercase s
  // javascript: string with uppercase s
  employeeName: {type: String, required: true},
  employeeEmail: {type: String, required: true}
});

// in order to create data/models based on above definition, we need to
// turn the definition into a model.
// we do that by using mongoose model function
// pass two arguments:
// 1st: the name of the mdoel (the name is up to me, but it should start with a uppercase letter)
// 2nd: the schema I want to use
const EmployeeInfo = mongoose.model('EmployeeInfo', employeeInfoSchema);
module.exports = EmployeeInfo;
