const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
    .get("/signin", (req, res) => {
    res.render("signin");
    })

    .get("/signup", (req, res) => {
    res.render("signup");
    });

router
    .post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });

    return res.redirect("/");
    })

    .post("/signin", async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
    
        return res.cookie("token", token).redirect("/");
    } catch (err) {
        return res.render("signin", {error: "Incorrect password or email"});
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = router;