const dotenv = require('dotenv')
dotenv.config();

const { app, express } = require('./server');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');
const session = require('express-session');

mongoose.set('strictQuery', true);

const MONGO_URL = process.env.MONGO_URI
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Database conneceted successfully")
}).catch((err) => {
    console.log("Error while connecting to database");
    console.log(err)
})
mongoose.set('strictQuery', true)

const sessionConfig = {
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}

const sessionMiddleWare = session(sessionConfig)

app.use(sessionMiddleWare)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie_parser())



/**All routing goes here */
const authRouter = require('./router/authRouter');
const taskRouter = require('./router/taskRouter');
const userRouter = require('./router/userRouter');
const departmentRouter = require('./router/departmentRouter');


app.use("/auth", authRouter);
app.use("/task", taskRouter)
app.use('/user', userRouter)
app.use('/department', departmentRouter)


app.get('/', function (req, res) {
    const data = {
        apis: [
            {
                user: "/user",
                task: "/task",
                department: "/department",
                assign: "/:taskId/:userId",
                decline: "/task/:taskId"
            }
        ],
        operations: [
            {
                create: "/post  POST",
                edit: "/:id     PUT",
                view: "/        GET",
                delete: "/:id    POST"
            }
        ]
    }
    res.send({
        data: data
    })
})



app.get('*', function (req, res) {
    res.send("Page not found").status(404)
})