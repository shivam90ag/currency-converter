var express = require('express');
var router = express.Router();
let HistoryService = require('../services/history.service')
let authMiddleware = require('../middleware/authenticated')

/* GET home page. */
router.post('/add', authMiddleware.isAuthenticated, (req, res) => {

    HistoryService.createHistory(req.body)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err);
        })
}).post('/delete', authMiddleware.isAuthenticated, (req, res) => {

    HistoryService.deleteHistory(req.body)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}).get('/list', authMiddleware.isAuthenticated, (req, res) => {
    HistoryService.getHistory(req.query)
        .then((history) => {
            res.status(200).json(history)
        }).catch((err) => {
            res.status(500).json(err);
        })
})
module.exports = router;