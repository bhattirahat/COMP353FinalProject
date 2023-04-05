const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')

// Query #
// GET employee information
router.get('/', async (req, res, next) => {
    query = `
        select 
            t1.employee_id, 
            t1.first_name,
            t1.last_name,
            t1.date_of_birth,
            t1.medical_card_number,
            t1.is_citizenship,
            t1.email,
            t2.Address_line,
            t2.Postal_Code,
            t3.telephone_number,
            t4.Type as occupation
        from Employee t1
        inner join Employee_Address t2 on t1.employee_id = t2.employee_id
        inner join Employee_Telephone t3 on t1.employee_id = t3.employee_id
        inner join Occupation t4 on t4.occupation_id = t1.occupation_id;
        `
    db.then(conn => {
        conn.query(query, (err, result, fields) => {
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
