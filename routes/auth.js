const express = require("express");
const sha256 = require("sha256");
const router = express.Router();
const {salt} = require("../secrets")
const {getRandomString} = require("../utils");
const { checkToken } = require("../middleware");

router.post("/", (req, res) => {
    console.log(req.body)
    const user = req.users.find(user => {
        return user.username === req.body.username && user.password === sha256(req.body.password + salt)
    });
if (!user) {
    res.send({status: 0, message: "Username & password combo not found"}) 
    return
}

const token = getRandomString();
user.token = token;
res.send({status: 1, message: "User logged in", token: token}); 

});

//logout user
router.delete("/", checkToken, (req,res) => {
    req.authenticatedUser.token = undefined;
    res.send({status: 1, message: "User logged out"})
})

module.exports = router;