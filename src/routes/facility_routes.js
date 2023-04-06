const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')

// Query #
// GET employee information
router.get('/', async (req, res, next) => {


    getFacility = `SELECT * from Facility;`
    getFacilityType = `SELECT type from Facility_Type;`
    get = getFacility + getFacilityType;



    db.then(conn => {
        conn.query(get, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                totalFacility = result[0]
                console.log("total" + totalFacility)
                totaltype = result[1]
                console.log(totaltype)
                res.status(StatusCode.SuccessOK)
                    .render('facility', {
                        pageTitle: 'Facility', success: '', data: totalFacility, field: totaltype
                    }) //perform your required work on result
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })





    // db.then(conn => {
    //     conn.query(`SELECT type from Facility_Type`, (err, result, fields) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log("SQL Query Result-- ", result);
    //         if (result.length !== 0) {

    //             res.status(StatusCode.SuccessOK)
    //             .render('facility', {
    //              pageTitle: 'Facility' , success:'', data: result
    //                          }) //perform your required work on result
    //         }
    //         // conn.end();
    //     });
    // }).catch(err => {
    //     console.log(err)
    // })  
})


router.post('/', async (req, res, next) => {

    var facility = req.body.facname;
    var type = req.body.type //from facility_type
    var address = req.body.address;
    var city = 1; //from city table
    var postalcode = req.body.postalcode;
    var phonenumber = req.body.phonenumber;
    var webaddress = req.body.webaddress;
    var capacity = req.body.Capacity



    db.then(conn => {
        conn.query(`Select facility_type_id from Facility_Type where type= "${type}"`, async (err, result, fields) => {
            if (err) {
                throw err;
            }
            //console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                result = result[0];
                factype = await result["facility_type_id"]

                var send =
                    `Insert Into Facility(name,facility_type_id,address,postal_code,phone_number,web_address,capacity)
                values("${facility}",${factype},"${address}","${postalcode}","${phonenumber}","${webaddress}",${capacity})`

                //query to insert into Facility Table
                db.then(conn => {
                    conn.query(send, (err, result, fields) => {
                        if (err) {
                            throw err;
                        }
                        // console.log("SQL Query Result-- ", result);
                        if (result.length !== 0) {
                            res.redirect(req.originalUrl)
                            // res.render('facility', {
                            //     pageTitle: 'Facility' , success:'Success'
                            // })
                        }
                        // conn.end();
                    });
                }).catch(err => {
                    console.log(err)
                })
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })

    // router.get('/data', async (req, res, next) =>{

    //     res
    //     .status(StatusCode.SuccessOK)
    //     .render('facilitydata', {
    //         pageTitle: 'Facility Data'
    //     })
    // })

    // var send = 
    // `Insert Into Facility(name,facility_type_id,address,city_id,postal_code,phone_number,web_address,capacity)
    //  values("${facility}",${type},"${address}",${city},"${postalcode}","${phonenumber}","${webaddress}",${capacity})`

    //  console.log(send)


    //  db.then(conn => {
    //     conn.query(send, (err, result, fields) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log("SQL Query Result-- ", result);
    //         if (result.length !== 0) {
    //             result = result[0];
    //             // res.redirect("/facility")
    //             res.render('facility', {
    //                 pageTitle: 'Facility' , success:'Success'
    //             })


    //         }
    //         // conn.end();
    //     });
    // }).catch(err => {
    //     console.log(err)
    // })

})

router.get("/data", async (req, res, next) => {


    res.status(StatusCode.SuccessOK)
        .render('facilitydata', {
            pageTitle: 'Facility'
        })
})

module.exports = router