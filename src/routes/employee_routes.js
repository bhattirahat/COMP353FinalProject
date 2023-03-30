const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')

// Query #
// GET employee information
router.get('/', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('employee', {
            pageTitle: 'Employee'
        })
})






module.exports = router
