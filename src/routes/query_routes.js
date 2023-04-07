const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')
// Query #
// GET employee information
router.get('/', async (req, res, next) => {

    query  = 
    `
    select t1.facility_id,t1.name,t1.address,City.name as City,Province.name as "Province" ,PostalCode.postal_code,
    t1.phone_number,t1.web_address,Facility_Type.type,t1.capacity,concat(Employee.first_name," ",Employee.last_name) as "General_Manager", t2.curr_num_workers
    From Facility t1
    join Facility_Type ON t1.facility_type_id = Facility_Type.facility_type_id
    join PostalCode on PostalCode.postal_code = t1.postal_code
    join City on PostalCode.city_id = City.city_id
    join Province on Province.province_id = City.province_id
    left join Manager_At on t1.facility_id = Manager_At.facility_id
    left join Employee on Manager_At.employee_id =Employee.employee_id
    left join (SELECT COUNT(employee_id) as curr_num_workers, facility_id  FROM Work_At GROUP BY facility_id)  t2 on t1.facility_id = t2.facility_id;`

    db.then(conn => {
        conn.query(query, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log(result)
            if (result.length !== 0) {
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                .render('query6',{ pageTitle :"Query6", data: result, field: queryresult})
            }
            else{
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                .render('query6',{ pageTitle :"Query6", data: []})
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is "+err)
    })
})

module.exports = router