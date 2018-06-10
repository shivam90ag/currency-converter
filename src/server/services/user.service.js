'use strict';
let ObjectId = require("mongoose").Types.ObjectId;
let User = require('../models/user.model');
let bcrypt = require('bcrypt-nodejs');

module.exports = {

    createUser: function (user) {
        return new Promise((resolve, reject) => {
            User.create(new UserConstruct(user), (err, userDoc) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                resolve(userDoc);
            })
        })
    },

    updateUser: function (userData, sessionUser) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ _id: ObjectId(sessionUser._id) }, { $set: { firstname: userData.firstname, lastname: userData.lastname } }, { new: true }, (err, userDoc) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                userDoc = JSON.parse(JSON.stringify(userDoc));
                delete userDoc.password;
                resolve(userDoc);
            });
        })
    },
    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(user);
            })
        })
    },
}

let UserConstruct = function (user) {
    this.username = user.username;
    this.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    this.firstname = user.firstname;
    this.lastname = user.lastname;
}