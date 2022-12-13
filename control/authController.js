const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb"
// const SALT = 12
module.exports.Login = async (req, res) => {
    const data = req.body;
    if (!data.username && data.password) {
        return res.json({
            msg: "Please Enter Your username or password"
        })
    }

    const user = await User.findOne({ username: data.username });
    console.log(user)
    if (!user) {
        return res.json({
            msg: "Incorrect username or password"
        })
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) {
        return res.json({
            msg: "Incorrect Username or Password"
        }).status(401)
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "24h" });
    req.session.token = token
    req.session.user = user

    return res.json({
        msg: "Logged In Successfully",
        token: token,

    }).status(200);

}



module.exports.logoutUser = (async function (req, res) {
    res.clearCookie("login_token");
    return res.json({
        msg: "Logged Out"
    })
})