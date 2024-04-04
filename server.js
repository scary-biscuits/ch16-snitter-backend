const express = require("express");
const app = express();

const sneets = require("./sneets.json");
const users = [];

app.use(express.static("public"));
app.use(express.json());

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