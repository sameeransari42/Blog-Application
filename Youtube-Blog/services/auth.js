const jwt = require("jsonwebtoken");

const SECRET_KEY = "$uperMan@123";

function createTokenForUser(user) {
   const payload = {
    _id : user._id,
    fullName: user.fullName,
    email : user.email,
    role: user.role
   };

   const token = jwt.sign(payload, SECRET_KEY);
   return token;
};

function validateToken(token) {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
};

module.exports = {
    createTokenForUser,
    validateToken
}