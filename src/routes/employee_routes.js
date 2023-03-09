const express = require('express');
const router = express.Router();
const path = require('path')
const { StatusCode } = require('status-code-enum')

// GET employee information
// Query #
router.get('/', async (req, res, next) => {
    res.status(StatusCode.SuccessOK).sendFile(path.join(__dirname, '../', 'views','employee.html'));
    //res.send({message: `hello from Employee router`});
})

module.exports = router
