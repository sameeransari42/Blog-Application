const express = require("express");
const connectMongoDB = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

const path = require("path");
const app = express();
const PORT = 3000;
connectMongoDB("Enter your mongoDB server address and database name")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve("./public")));
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {user: req.user, blogs: allBlogs});
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server start listening at PORT ${PORT}`);
});
