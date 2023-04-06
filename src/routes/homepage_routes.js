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
        .render('homepage', {
            pageTitle: 'Homepage'
        })
})

router.get('/query6', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query6', {
            pageTitle: 'Query 6'
        })
})

router.get('/query7', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query7', {
            pageTitle: 'Query 7'
        })
})

router.get('/query8', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query8', {
            pageTitle: 'Query 8'
        })
})

router.get('/query9', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query9', {
            pageTitle: 'Query 9'
        })
})

router.get('/query10', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query10', {
            pageTitle: 'Query 10'
        })
})

router.get('/query11', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query11', {
            pageTitle: 'Query 11'
        })
})

router.get('/query12', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query12', {
            pageTitle: 'Query 12'
        })
})

router.get('/query13', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query13', {
            pageTitle: 'Query 13'
        })
})

router.get('/query14', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query14', {
            pageTitle: 'Query 14'
        })
})

router.get('/query15', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query15', {
            pageTitle: 'Query 15'
        })
})

router.get('/query16', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query16', {
            pageTitle: 'Query 16'
        })
})

router.get('/query17', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query17', {
            pageTitle: 'Query 17'
        })
})
module.exports = router
