const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');

// GET Vaccination information
router.get('/', async (req, res, next) => {
    getFacility = `SELECT  t1.Vaccination_id, t2.Vaccine_type, t1.Dose, t1.employee_id, t3.name, t1.Vaccination_date
    FROM Vaccination t1
    inner join Vaccine t2 on t1.Vaccine_id = t2.Vaccine_id
    inner join Facility t3 on t1.facility_id = t3.facility_id;`
    //getFacilityType = `SELECT type from Vaccine;`
    get = getFacility;
    db.then(conn => {
        conn.query(get, (err, result, fields) => {
            if (err) {
                throw err;
            }
            //console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                totalVaccination = result
                //console.log("total"+totalVaccination)
                totaltype = result[1]
                //console.log(totaltype)
                res.status(StatusCode.SuccessOK)
                    .render('vaccination', {
                        pageTitle: 'Vaccination',
                        success: '',
                        data: totalVaccination,
                        field: totaltype
                    }) //perform your required work on result
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })
})

router.get('/edit/:id', async (req, res, next) => {
    res.render('vaccination-edit', {
        pageTitle: 'Vaccination Edit',
        id: req.params.id
    })

})
router.get('/add', async (req, res, next) => {
    //console.log(req.params.id);
    res.render('vaccination-add', {
        pageTitle: 'Vaccination Add'
    })

})

router.post('/add-submit', async (req, res, next) => {
    db.then(conn => {
        conn.query(`Insert into Vaccination(Vaccine_id, Dose, employee_id, facility_id, Vaccination_date) 
        Values("${req.body.VType}","${req.body.Dose}","${req.body.EID}", "${req.body.FID}", "${req.body.Date}")`)
    })
    res.redirect('/vaccination')
})

router.post('/edit-submit/:id', async (req, res, next) => {
    //console.log(req.body);
    //console.log(req.params.id);
    db.then(conn => {
        conn.query(`UPDATE Vaccination
        SET Vaccine_id ="${req.body.VType}", Dose = "${req.body.Dose}", employee_id="${req.body.EID}", facility_id="${req.body.FID}", Vaccination_date="${req.body.Date}"
        where Vaccination_id="${req.params.id}";`)
    })
    res.redirect('/vaccination')
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    //console.log(id)
    db.then(conn => {
        conn.query(`Delete from Vaccination where Vaccination_id="${id}"`)

    })
    res.json({ message: "Testing 1" });
})

module.exports = router
