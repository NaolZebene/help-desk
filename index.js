const { app, express } = require('./server');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');

mongoose.set('strictQuery', true);

const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost/help-desk"

mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Database conneceted successfully")
}).catch((err) => {
    console.log("Error while connecting to database");
    console.log(err)
})
mongoose.set('strictQuery', true)


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



/**All routing goes here */
const authRouter = require('./router/authRouter');
const taskRouter = require('./router/taskRouter');
const userRouter = require('./router/userRouter');


app.use("/auth", authRouter);
app.use("/task", taskRouter)
app.use('/user', userRouter)



app.get('*', function (req, res) {
    res.send("Page not found").status(404)
})