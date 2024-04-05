const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const {salt} = require("../secrets");
const {findUserByCreds, findUserIndexOfById} = require("../utils");
const { checkToken } = require("../middleware");

//add a new user
router.post("/", (req, res) => {
    let {users, body, lastAssignedId } = req;
    let {name, username, email, password} = body;
 
    if(!username || !password || !email) {
        res.send({status: 0, message: "Insufficient data sent in request"});
        return;
    }

    password = sha256(password + salt);

    const user = findUserByCreds(users, username, password, email);

    if (user) {
        res.send({status: 0, message: "An account with these credentials already exists"})
        return;
    }
    lastAssignedId.value++;
    users.push({id: lastAssignedId.value, name, username, email, password });
    res.send({status: 1, id: lastAssignedId.value})
})

//TESTING ONLY - get all users
router.get("/", (req,res) => {
    res.send(req.users);
})

//get one user
router.get("/:id", checkToken, (req, res) => {

res.send({status: 1, user: req.authenticatedUser});
});

router.patch("/:id", (req, res) => {
const {email, password, name} = req.body;
let {id} = req.params;
const {users} = req;

//defensive checks

 if (!(email || password || name)) {
    res.send({status: 0, message: "No data sent"});
 }

 id = Number(id);

 if (!id || Number.isNaN(id)) {
     res.send({status: 0, message: "Missing or invalid ID sent"})
 return;
 }
 
 const indexOf = findUserIndexOfById(users, id);
 
 if (indexOf === -1) {
     res.send({status: 0, message: "User not found"});
 }

 //update
if (email) {
    users[indexOf].email = email;
}
if (password) {
    users[indexOf].password = sha256(password + salt);
};

if(name) {
    users[indexOf].name = name;
}

 res.send({status: 1, message: "User updated"})

});


//append random data - needs work
router.patch("/append/:id", (req, res) => {
    let {id} = req.params;
    const {users} = req;

    id = Number(id);

if (!id || Number.isNaN(id)) {
    res.send({status: 0, message: "Missing or invalid ID sent"})
return;
};

const indexOf = findUserIndexOfById(users, id);

users[indexOf].newData = req.body;
res.send({status: 1, message: "New data added"})
})



//delete a user
router.delete("/:id", (req, res) => {
    let {id} = req.params;
    const {users} = req;

    id= Number(id);

if (!id || Number.isNaN(id)) {
    res.send({status: 0, message: "Missing or invalid ID sent"})
return;
}

const indexOf = findUserIndexOfById(users,id);

if (indexOf === -1) {
    res.send({status: 0, message: "User not found"})
}

//delete found user
users.splice(indexOf, 1)
res.send({status: 1, message: "User deleted"})

})

module.exports = router;