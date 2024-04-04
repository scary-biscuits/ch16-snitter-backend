function findUserByCreds(users, username, password, email) {
    return users.find(user => {
        return user.username === username && user.password === password && user.email === email; 
    })
};

function findUserIndexOfById(users, id) {
    users.findIndex((user) => {
        return user.id === id 
    });
}

module.exports = {findUserByCreds, findUserIndexOfById};