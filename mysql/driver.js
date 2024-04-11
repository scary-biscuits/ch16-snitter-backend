const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "snitter"
});

connection.connect();

function asyncMySQL(query) {
    return new Promise((resolve,reject) => {
        connection.query(query, (error, results) =>{

            if (error) {
                reject();
            return;
            }

resolve(results);
        })
    })
}

async function getData() {
const data = await asyncMySQL(`SHOW tables;`);
console.log(data);
getData();
}

module.exports = asyncMySQL;