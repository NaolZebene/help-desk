const dotenv = require("dotenv");
dotenv.config();

const { app, express } = require("./server");
const mongoose = require("mongoose");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const ExpressError = require("./util/ExpressError");
const path = require("path");
const checkUser = require("./util/seedAdmin");

mongoose.set("strictQuery", true);

const MONGO_URL = process.env.MONGO_URI;
mongoose
  .connect("mongodb://127.0.0.1/ictDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database conneceted successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to database");
    console.log(err);
  });
mongoose.set("strictQuery", true);

checkUser()
  .then(() => {
    console.log("User Exists");
  })
  .catch((err) => {
    console.log(err);
  });

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
};

const sessionMiddleWare = session(sessionConfig);

app.use(sessionMiddleWare);
app.use(express.static(path.join(__dirname, "/public")));
app.use("/reportFiles", express.static(path.join(__dirname, "reportFiles")));
app.use("/logo", express.static(path.join(__dirname, "logo")));
app.use("/icon", express.static(path.join(__dirname, "icon")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie_parser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors());

/**All routing goes here */
const authRouter = require("./router/authRouter");
const taskRouter = require("./router/taskRouter");
const userRouter = require("./router/userRouter");
const employeeRouter = require("./router/employeeRouter");
const investorRouter = require("./router/investorRouter");
const departmentRouter = require("./router/departmentRouter");
const testimonialRouter = require("./router/testimonialRouter");
const clientRouter = require("./router/clientRouter");
const homeRouter = require("./router/homeRouter")

app.use("/home", homeRouter)
app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/report", investorRouter);
app.use("/department", departmentRouter);
app.use("/testimonial", testimonialRouter);
app.use("/clients", clientRouter);

app.get("/", function (req, res) {
  const data = {
    apis: [
      {
        user: "/user",
        investor: "/user/investor",
        task: "/task",
        department: "user//department",
        assign: "/:taskId/:userId  GET",
        decline: "/task/:taskId  GET",
        viewonetask: "/task/view/:taskId  GET",
        escalatetask: "/employee/escalate/:taskId  GET",
        login: "(admin and emp) /auth.login POST",
        logininvestor: "/auth/investor/login POST",
        logindepartment: "auth/investor/login POST",
      },
    ],
    operations: [
      {
        create: "/post  POST",
        edit: "/:id     PUT",
        view: "/        GET",
        delete: "/:id    POST",
      },
    ],
  };
  res.send({
    data: data,
  });
});

app.all("*", function (req, res, next) {
  next(ExpressError("Page not found", 404));
});

app.use(function (err, req, res, next) {
  const { status = 500 } = err;
  if (!err.message) {
    err.message = "Something went wrong";
  }
  res
    .json({
      msg: err.type,
    })
    .status(status);
});
