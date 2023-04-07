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
            data: []
        })
})

router.get('/query7/getInfo', async (req, res, next) => {
    FID = req.query.FID
    //console.log(req.query.FID)
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
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query7', {
                        pageTitle: 'Query 7',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })

})

router.get('/query8', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query8', {
            pageTitle: 'Query 8',
            data: []
        })
})

router.get('/query8/getInfo', async (req, res, next) => {
    EID = req.query.EID
    console.log(EID)
    getInfo = `select t2.name, t1.Work_Date,t1.Start_Time,t1.End_Time
    from Employee_Schedule t1
    Inner Join Facility t2 on t1.facility_id = t2.facility_id
    where employee_id="${EID}"
    Order by t2.name asc, t1.Work_Date asc, t1.Start_Time asc`
    db.then(conn => {
        conn.query(getInfo, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                console.log(result)
                totaltype = result[1]
                res.status(StatusCode.SuccessOK)
                    .render('query8', {
                        pageTitle: 'Query 8',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query8', {
                        pageTitle: 'Query 8',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
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
            pageTitle: 'Query 12',
            data: []
        })
})
router.get('/query12/getInfo', async (req, res, next) => {
    SDate = req.query.SDate
    //console.log(SDate)
    EDate = req.query.EDate
    //console.log(EDate)
    FID = req.query.FID
    //console.log(FID)
    getInfo = `select Occupation.Type as "Role",Sum(Hours) as "Total_Hours"
    from Employee_Schedule 
    Inner Join Employee on (Employee_Schedule.employee_id=Employee.employee_id) 
    Inner Join Occupation on (Employee.occupation_id=Occupation.occupation_id) 
    where("${SDate}"<=Employee_Schedule.Work_Date<="${EDate}") and	Employee_Schedule.facility_id="${FID}"
    Group by Occupation.Type 
    Order by Occupation.Type asc`
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
                    .render('query12', {
                        pageTitle: 'Query 12',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query12', {
                        pageTitle: 'Query 12',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
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
            pageTitle: 'Query 16',
            data: []
        })
})

router.get('/query16/getInfo', async (req, res, next) => {
    getInfo = `select t1.first_name, t1.last_name,t4.Type,t1.email,t1.date_of_birth,Sum(t2.Hours) as "Total_Hours", min(t5.Start_Date) as "First_Day"
    from Employee t1
    INNER JOIN Employee_Schedule t2 ON t1.employee_id = t2.employee_id 
    INNER JOIN Occupation t4 ON t1.occupation_id = t4.occupation_id
    Inner Join Work_At t5 on t1.employee_id = t5.employee_id
    INNER JOIN (
    SELECT Employee_id, COUNT(*) AS num_infections 
    From Infection WHERE infection_type_id IN (1, 2) 
    GROUP BY employee_id 
    HAVING num_infections >= 3) t3 ON t1.employee_id = t3.employee_id
    where (t1.occupation_id=1 or t1.occupation_id=2)
    group by t1.employee_id
    Order by t4.Type asc, t1.first_name asc,t1.last_name asc;
    `
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
                    .render('query16', {
                        pageTitle: 'Query 16',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query16', {
                        pageTitle: 'Query 16',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
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
