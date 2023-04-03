const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');


// GET Vaccination information
router.get('/', async (req, res, next) => {
    

    getFacility = `SELECT * from Vaccination;`
    //getFacilityType = `SELECT type from Vaccine;`
    get = getFacility;//+getFacilityType;
    


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
                 pageTitle: 'Vaccination' , success:'', data: totalVaccination , field:totaltype
                        
                }) //perform your required work on result
                 
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })
})

router.post('/',async(req,res,next)=>{

    var id = req.body.Vaccination_id;
    
     db.then(conn => {
        conn.query(`Delete from Vaccination where Vaccination_id="${id}"` , async (err, result, fields) => {
            if (err) {
                throw err;
            }
            res.status(StatusCode.SuccessOK)
                .render('vaccination', {
                 pageTitle: 'Vaccination' , success:'', data: totalVaccination , field:totaltype
                        
                })
    }).catch(err => {
        console.log(err)
    })
})})


router.get('/', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('vaccination', {
            pageTitle: 'Vaccination'
        })
})

module.exports = router
