const express = require('express');
const router = express.Router();
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');
 
// GET Infection data and render the infection table
router.get('/', async (req, res) => {
    selectAll = `SELECT a.date, a.employee_id, a.infection_id, b.type FROM infection a INNER JOIN infection_type b ON a.infection_type_id=b.infection_type_id`
    db.execute(
        selectAll,
        function(err, data) {
            if(err) throw err;
            if(data.length >= 1) {
                res.status(StatusCode.SuccessOK)
                .render('infection', {
                    pageTitle: 'Infection',
                    success: '',
                    data: data
            }) 
            } else {
                console.log("No results were returned.");
            }
        }
      );
});

module.exports = router;