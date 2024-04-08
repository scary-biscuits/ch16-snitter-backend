function checkToken(req, res, next) {
    const user = req.users.find(user => {
        return user.token.includes(req.headers.token);

    });
    if(user) {
        req.authenticatedUser = user;
        next();
        return;
    };

    res.send({status: 0, message: "Invalid token"})

}

module.exports = {checkToken}