//check if user session exists
let jwtHanndler = require('../util/jwt.handler')
let UserService = require('../services/user.service');
let bcrypt = require('bcrypt-nodejs');
module.exports = {
    login: function (req,res, next) {
        let username = req.body.username;
        let password = req.body.password;
        UserService.getUserByUsername(username).then((user) => {
            if (!user) {
                res.status(401).json({ message: 'Incorrect username' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).json({ message: 'Incorrect password' });
            }
            req.user = JSON.parse(JSON.stringify(user));
            delete req.user.password
            let jwtToken = jwtHanndler.generateJWTToken(req.user)
            res.cookie('Auth bearer',jwtToken, { maxAge: 900000, httpOnly: true });
            res.status(200).json({ message: 'logged in successfully', _id: req.user._id });
        }).catch(() => {
            res.status(500).json({ message: "Internal Server Error" });
        })
    },
    register:function (req, res, next) {
        let username = req.body.username;
        UserService.getUserByUsername(username).then((user) => {
            if (user) {
                res.status(302).json({ message: 'duplicate username' });
            }
            UserService.createUser(req.body).then((newUser) => {
                req.user = JSON.parse(JSON.stringify(newUser));
                delete req.user.password
                res.status(200).json({ message: 'New User created successfully' });
            }).catch((err) => {
                res.status(500).json({ message: err });
            })
        }).catch((err) => {
            res.status(500).json({ message: err });
        })
    },
    isAuthenticated : function(req, res, next) {
        if (req.isAuthenticated) {
            return next();
        }
        res.sendStatus(401);
    },
    setSessionDataIntoHttpRequestObject: (req, res, next) => {
        let accessToken = req.cookies['Auth bearer'];
        if (accessToken) {
            jwtHanndler.verifyJWTToken(accessToken)
                .then((sessionData) => {
                    req.user = sessionData;
                    req.isAuthenticated = true;
                    next();
                })
                .catch(() => {
                    req.isAuthenticated = false;
                    next();
                })
        } else {
            req.isAuthenticated = false;
            next();
        }
    }
}

