const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')

// Query #
// GET employee information
router.get('/', async (req, res, next) => {
    db.then(conn => {
        conn.query(`SELECT * from Employee`, (err, result, fields) => {
            if (err) {
                throw err;
            }
            //console.log("SQL Query Result-- ", result);
            // if (result.length !== 0) {
            //     result = result[0];
            //     //perform your required work on result
            // }
            res
                .status(StatusCode.SuccessOK)
                .render('employee', {
                    pageTitle: 'Employee',
                    employee: result
                })
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })

})


router.put('/edit', async (req, res, next) => {
    const itemData = req.body;
    console.log(itemData)
    res.status(StatusCode.SuccessOK).send('data received!')
})





module.exports = router
