const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // try to get a token from the incoming request
  // and store it in a constant
  // ExpressJS gives us a header object
  // and we have an authorization header (we can name it whatever)
  try {
    const token = req.headers.authorization.split(" ")[1];
    //verify a token
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed!"});
  }

};
