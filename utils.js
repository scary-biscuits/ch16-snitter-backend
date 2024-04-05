function findUserByCreds(users, username, password, email) {
    return users.find(user => {
        return user.username === username && user.password === password && user.email === email; 
    })
};

function findUserIndexOfById(users, id) {
   return users.findIndex((user) => {
        return user.id === id 
    });
}

function getRandomString() {
    return Math.floor(Math.random() * 9999999999999999)
}

module.exports = {findUserByCreds, findUserIndexOfById, getRandomString};