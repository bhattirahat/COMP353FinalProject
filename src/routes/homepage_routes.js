const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');

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
            pageTitle: 'Query 7',
            data:[]
        })
})
router.get('/query7/getInfo', async (req, res, next) => {
    FID=req.query.FID
    //console.log(req.query.FID)
    checkFacility=`SELECT 1 FROM Facility WHERE facility_id=${FID}`
    getInfo = `select t1.first_name,t1.last_name,t2.Start_Date,t1.date_of_birth as "DOB",t1.medical_card_number,t4.telephone_number,t5.Address_line,t7.name as"City", t8.name as "Province",t6.Postal_Code, t1.is_citizenship, t1.email
    from Employee t1
    Inner Join Work_At t2 on t1.employee_id=t2.employee_id
    INNER JOIN Occupation t3 ON t1.occupation_id = t3.occupation_id
    Inner Join Employee_Telephone t4 on t1.employee_id=t4.employee_id
    Inner Join Employee_Address t5 on t1.employee_id = t5.employee_id
    Inner Join PostalCode t6 on t5.Postal_Code = t6.postal_code
    Inner Join City t7 on t6.city_id = t7.city_id
    Inner Join Province t8 on t7.province_id = t8.province_id
    Inner Join Facility t9 on t2.facility_id = t9.facility_id
    where (t2.End_Date is NULL) and (t2.facility_id="${FID}") and EXISTS (SELECT 1 FROM Facility WHERE Facility.facility_id="${FID}")
    Order by t3.Type asc, t1.first_name asc, t1.last_name asc;`
    db.then(conn => {
        conn.query(getInfo, (err, result, fields) => {
            if (err) {
                throw err;
            }
            //console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                console.log(result)
                totaltype = result[1]
                res.status(StatusCode.SuccessOK)
                    .render('query7', {
                        pageTitle: 'Query 7',
                        success: '',
                        data: result,
                        field: totaltype
                    }) 
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })
    res
        .status(StatusCode.SuccessOK)
        .render('query7', {
            pageTitle: 'Query 7',
            data:[]
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
