const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors());

const sneets = require("./sneets.json");
const users = [];
let lastAssignedId = {value: 0};


app.use(express.static("public"));
app.use(express.json());

//mw adds users array to req
app.use(function(req, res, next) {
req.users = users;
req.lastAssignedId = lastAssignedId;
next();
})

//routes
app.use("/user", require("./routes/user"));
app.use("/authenticate", require("./routes/auth"));

app.get("/sneets", (req,res) => {
    res.send("hello")
})

// sneets.forEach((item, index) => {
//     item.id = index + 1;
//   });

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});