const Department = require('../model/Departments')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb"
const wrapAsync = require('../util/wrapAsync')

module.exports.Login = wrapAsync(async (req, res) => {
    const data = req.body;
    if (!data.title && data.password) {
        return res.json({
            msg: "Please Enter Your companyname or password"
        })
    }

    const user = await Department.findOne({ companyName: data.username });
    console.log(user)
    if (!user) {
        return res.json({
            msg: "Incorrect Department Name or password"
        })
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) {
        return res.json({
            msg: "Incorrect Department name or Password"
        }).status(401)
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "24h" });
    req.session.token = token
    req.session.user = user

    return res.json({
        msg: "Logged In Successfully",
        token: token,

    }).status(200);

})