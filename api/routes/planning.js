const express = require('express');
const router = express.Router();
const connection = require('../../sql/connection');
const sha1 = require('sha1');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM planning', (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({err});
        }
        res.status(200).json(data);
    });
});
