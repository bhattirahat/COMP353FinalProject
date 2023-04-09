const express = require('express');
const router = express.Router();
const path = require('path')
const rootDir = require('../util/path');
const { StatusCode } = require('status-code-enum')
const db = require('../util/database')

// Query #
// GET employee information



router.get('/', async (req, res, next) => {
    

    getFacility = `Select Facility.facility_id,Facility.name,Facility_Type.type,Facility.address,Facility.postal_code,Facility.phone_number,Facility.web_address,Facility.capacity from Facility
    JOIN Facility_Type ON Facility.facility_type_id = Facility_Type.facility_type_id;`
   
    getFacilityType =`SELECT type from Facility_Type;`
    getCities = `Select City.name from City;`
   
    get = getFacility+getFacilityType+getCities;

     db.then(conn => {
        conn.query(get, (err, result, fields) => {
            if (err) {
                throw err;
            }
             //console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                totalFacility = result[0]
                console.log("total"+totalFacility)
                totaltype = result[1]
                cities = result[2]
                console.log(totaltype)
                res.status(StatusCode.SuccessOK)
                .render('facility', {
                 pageTitle: 'Facility', data: totalFacility , field:totaltype, city:cities
                             }) //perform your required work on result
            }
            // conn.end();
        });
    }).catch(err => {
        console.log(err)
    })

})


router.post('/post',async(req,res,next)=>{

    var facility = req.body.facname;
    var type = req.body.type //from facility_type
    var address  = req.body.address;
    var city = req.body.city; //from city table
    var postalcode = req.body.postalcode;
    var phonenumber = req.body.phonenumber;
    var webaddress = req.body.webaddress;
    var capacity = req.body.Capacity
    
    console.log(city)

    sendCity = `Select City.city._id from City where name = ${city}`;
    
     db.then(conn => {
        conn.query(`Select facility_type_id from Facility_Type where type= "${type}"` , async (err, result, fields) => {
            if (err) {
                 throw err;
                // res.redirect('/')
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
                // res.redirect('/')
                throw err;
            }
            // console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                res.redirect('/facility') 
        
               
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
    
})

router.get('/delete/:id',async(req,res,next)=>{

    let id = req.params.id    
    deletequery = `Delete from Facility where facility_id = ${id};`
    console.log(deletequery)
    db.then(conn => {
        conn.query(deletequery, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                result = result[0];
                res.redirect('/facility')
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is "+err)
    })
})


router.get('/edit/:id',async(req,res,next)=>{
 
    let id = req.params.id  
    getData = `Select * from Facility where facility_id = ${id};`
    getFacilityType =`SELECT type from Facility_Type;`
    
    total = getData+getFacilityType

    db.then(conn => {
        conn.query(total, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                result = result[0];
                totaltype = result[1]
                res.render('facilityEdit',{ pageTitle:"Edit",data:result[0],field:totaltype})
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is "+err)
    })
    
})

router.post('/edit/:id',async(req,res,next)=>{
    

    editquery = 
    `Update Facility set name = "${req.body.facname}",
    address ="${req.body.address}",
    postal_code = "${req.body.postalcode}",
    phone_number = "${req.body.phonenumber}",
    web_address = "${req.body.webaddress}",
    capacity = ${req.body.Capacity}
    where facility_id = ${req.params.id};`

    db.then(conn => {
        conn.query(editquery, (err, result, fields) => {
            if (err) {
                throw err;
            }
            console.log("SQL Query Result-- ", result);
            if (result.length !== 0) {
                result = result[0];
                res.redirect('/facility')
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is "+err)
    })
  
})




module.exports = router
