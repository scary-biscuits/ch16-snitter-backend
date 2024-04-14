
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let connection;

const connect = async () => {
    try { 
 connection = await mongoose.connect(`mongodb://127.0.0.1:27017/test`);
mongoose.connection.collection("error", (err) => {
    console.log(err);
});

/////
/////

const personschema = new Schema({
    name: String,
    age: Number,
    location: String,
    isHappy: Boolean
});



const Person = mongoose.model("Person", personschema);

//create
// const russell = new Person({name: "Russell", age: 42, location: "UK", isHappy: true})
// russell.save();

//read
// const person = await Person.find({name: "Russell"});
// console.log(person);

//update
// const result = Person.findOneAndUpdate({name: "Russell"}, {location: "Spain"})
// console.log(result);

//delete
// const result = await Person.deleteMany({name: "Russell"});
// console.log(result);

/////
/////

    } catch (e) {
        console.log("Are you sure MongoDB is running", e)
    }
}

connect();
module.exports = connection;
