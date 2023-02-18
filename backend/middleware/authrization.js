
const jwt = require("jsonwebtoken");


const authorization = (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRET_CODE, (err, decoded) => {
        if (decoded) {
            req.body.user = decoded.id;
            next();
        }
        else {
            res.send({ msg: "Something went wrong", error: err.message });
        }
    });
}

module.exports = authorization;