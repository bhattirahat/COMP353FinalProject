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

    query =
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
            if (result.length !== 0) {
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                    .render('query/query6', {
                        pageTitle: "Query 6",
                        data: result,
                        field: queryresult
                    })
            } else {
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                    .render('query/query6', {
                        pageTitle: "Query 6",
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is " + err)
    })
})

router.get('/query7', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query/query7', {
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
                    .render('query/query7', {
                        pageTitle: 'Query 7',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query7', {
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
        .render('query/query8', {
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
                    .render('query/query8', {
                        pageTitle: 'Query 8',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query8', {
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
        .render('query/query9', {
            pageTitle: 'Query 9'
        })
})

router.get('/query10', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query/query10', {
            pageTitle: 'Query 10'
        })
})

router.get('/query11', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query/query11', {
            pageTitle: 'Query 11',
            data: []
        })
})

router.get('/query11/getInfo', async (req, res, next) => {

    facility_id = req.query.FCL;

    console.log(facility_id)

    getInfo = `
    select ES.employee_id, Employee.first_name, Employee.last_name, Occupation.Type, ES.facility_id,ES.Work_Date
    FROM Employee_Schedule as ES
    join Employee on ES.employee_id = Employee.employee_id
    join Occupation on Employee.occupation_id = Occupation.occupation_id
    where 
    (Occupation.Type = "Doctor" or Occupation.Type = "Nurse") and 
    Work_Date >= DATE_SUB(CURDATE(), INTERVAL 2 WEEK) and
    ES.facility_id = "${facility_id}"
    group by Employee_id
    order by Occupation.Type, Employee.first_name;`
    console.log(getInfo)
    db.then(conn => {
        conn.query(getInfo, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                console.log(result)
                res.status(StatusCode.SuccessOK)
                    .render('query/query11', {
                        pageTitle: 'Query 11',
                        success: '',
                        data: result,

                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query11', {
                        pageTitle: 'Query 11',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })



})

router.get('/query12', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query/query12', {
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
                    .render('query/query12', {
                        pageTitle: 'Query 12',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query12', {
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
        .render('query/query13', {
            pageTitle: 'Query 13'
        })
})

router.get('/query14', async (req, res, next) => {

    getInfo = `select Es.employee_id, Employee.first_name, Employee.last_name,
    count(Distinct Es.facility_id) as N_OF_Facility,
    City.name as City,
    Occupation.Type
    from Employee_Schedule as Es
    join Facility on Facility.facility_id = Es.facility_id
    join PostalCode on PostalCode.postal_code =Facility.postal_code
    join City on PostalCode.city_id = City.city_id
    join Province on Province.province_id  = City.province_id
    --
    join Employee on  Es.employee_id = Employee.employee_id
    join Occupation on Employee.occupation_id = Occupation.occupation_id
    --
    join Employee_Address on Employee_Address.employee_id = Employee.employee_id
    join PostalCode as PC on Employee_Address.Postal_Code = PC.postal_code
    join City AS CT on PC.city_id = CT.city_id
    
    where Province.name = "Quebec" and Occupation.Type = "Doctor"
    GROUP BY Es.employee_id
    order by City Asc, N_OF_Facility DESC;
    `


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
                    .render('query/query14', {
                        pageTitle: 'Query 14',
                        success: '',
                        data: result,

                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query14', {
                        pageTitle: 'Query 14',
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })
})

router.get('/query15', async (req, res, next) => {
    query =
        `
            select t2.first_name,  t2.last_name, t1.Start_Date,  t2.date_of_birth, t2.email, SUM(t3.End_time - t3.Start_time) as Total_hours_worked
            from Work_At t1
            inner join Employee t2 on t1.employee_id = t2.employee_id
            inner join History_Schedule t3 on t1.employee_id = t3.employee_id
            where t2.occupation_id = 1 and (t1.End_Date is Null or t1.End_Date >= current_date())
            group by t1.employee_id
            having SUM(t3.End_time - t3.Start_time) =
            (
            SELECT MAX(total_hours)
            FROM (
            SELECT t1.employee_id, SUM(End_time - Start_time) AS total_hours
            FROM Work_At t1
            INNER JOIN History_Schedule t2 ON t1.employee_id = t2.employee_id
            WHERE t1.End_Date is Null or t1.End_Date >= current_date()
            GROUP BY t1.employee_id
            ) t3
            INNER JOIN Employee t4 ON t4.employee_id = t3.employee_id
            WHERE t4.occupation_id = 1
            );
        `
    db.then(conn => {
        conn.query(query, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                    .render('query/query15', {
                        pageTitle: "Query 15",
                        data: result,
                        field: queryresult
                    })
            } else {
                queryresult = result[0];
                res.status(StatusCode.SuccessOK)
                    .render('query/query15', {
                        pageTitle: "Query 15",
                        data: []
                    })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is " + err)
    })
})

router.get('/query16', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('query/query16', {
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
                    .render('query/query16', {
                        pageTitle: 'Query 16',
                        success: '',
                        data: result,
                        field: totaltype
                    })
            }
            else {
                res
                    .status(StatusCode.SuccessOK)
                    .render('query/query16', {
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
        .render('query/query17', {
            pageTitle: 'Query 17'
        })
})
module.exports = router
