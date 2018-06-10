'use strict';
let ObjectId = require("mongoose").Types.ObjectId;
let History = require('../models/history.model');
let bcrypt = require('bcrypt-nodejs');

module.exports = {

    createHistory: function (history) {
        return new Promise((resolve, reject) => {
            History.create(new HistoryConstruct(history), (err, historyDoc) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                resolve(historyDoc);
            })
        })
    },
    getHistory(params) {
        let pageNo=+params.pageNo;
        let pageSize=+params.pageSize;
        let skips = pageSize * (pageNo-1);
        return new Promise((resolve, reject) => {
            History.find({}).sort({querydate: -1}).skip(skips).limit(pageSize).exec(function (err, history) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(history);
            })
        })
    },
    deleteHistory:function (historyIds) {
        return new Promise((resolve, reject) => {
            History.remove({ _id: {$in:historyIds}}, (err, historyDoc) => {
                if (err) {
                    return reject(err);
                }
                resolve(historyDoc);
            });
        })
    },
}

let HistoryConstruct = function (history) {
    this.from = history.from;
    this.to = history.to;
    this.value = history.value;
    this.convertedvalue = history.convertedvalue;
    this.querydate = new Date();
}