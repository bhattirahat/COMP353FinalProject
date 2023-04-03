const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')

// Query #
// GET employee information
router.get('/', async (req, res, next) => {
    res
        .status(StatusCode.SuccessOK)
        .render('facility', {
            pageTitle: 'Facility', success: ''
        })
})
router.post('/', async (req, res, next) => {

    var facility = req.body.facname;
    var type = 1
    var address = req.body.address;
    var city = 1;
    var postalcode = req.body.postalcode;
    var phonenumber = req.body.phonenumber;
    var webaddress = req.body.webaddress;
    var capacity = req.body.Capacity

    var send =
        `Insert Into Facility(name,facility_type_id,address,city_id,postal_code,phone_number,web_address,capacity)
     values("${facility}",${type},"${address}",${city},"${postalcode}","${phonenumber}","${webaddress}",${capacity})`

    db.then(conn => {
        conn.query(send, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                result = result[0];
                // res.redirect("/facility")
                res.render('facility', {
                    pageTitle: 'Facility', success: 'Success'
                })
            }
            conn.end();
        });
    }).catch(err => {
        console.log(err)
    })


})

// router.get("/",async(req,res,next)=>{

// })

module.exports = router
