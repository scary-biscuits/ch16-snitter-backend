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

function getRandomString(len=32) {
    let uniqueId = "";
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     
    for (let i = 0; i < len; i++) {
    uniqueId += charset.charAt(Math.floor(Math.random() * charset.length));
    };
    return (uniqueId+=Date.now());
}

module.exports = {findUserByCreds, findUserIndexOfById, getRandomString};