const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb"
const wrapAsync = require('../util/wrapAsync');





module.exports.Login = wrapAsync(async (req, res) => {
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
        role: user.role

    }).status(200);

})

module.exports.VerifyUserToken = wrapAsync(async function (req, res) {
    const token = req.body.token.split(" ")[1];
    const validToken = jwt.verify(token, SECRET_KEY);
    if (!validToken) {
        return res.json({
            msg: true
        }).status(401)
    }
    return res.json({
        msg: false
    }).status(200)
})