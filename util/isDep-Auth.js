const jwt = require("jsonwebtoken");
// const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb";
const SECRET_KEY = "department";

module.exports = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        console.log(err);
    }
    if (!decodedToken) {
        return res.json({
            msg: "You have to login first",
            status: 401,
        });
    } else {
        console.log(decodedToken);
    }
    next();
};