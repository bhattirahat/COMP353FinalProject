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
            t6.name as city,
            t7.name as province,
            t3.telephone_number,
            t4.Type as occupation
        from Employee t1
        left join Employee_Address t2 on t1.employee_id = t2.employee_id
        left join Employee_Telephone t3 on t1.employee_id = t3.employee_id
        left join Occupation t4 on t4.occupation_id = t1.occupation_id
        left join PostalCode t5 on t5.postal_code = t2.Postal_Code
        left join City t6 on t6.city_id = t5.city_id
        left join Province t7 on t7.province_id = t6.province_id
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
        });
    }).catch(err => {
        console.log(err)
    })

})

router.post('/create', async (req, res, next) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const medCardNum = req.body.medCardNum;
        const telephone = req.body.telephone;
        const dob = req.body.dob;
        const occupation = req.body.occupation;
        const address = req.body.address;
        const postalCode = req.body.postalCode;
        const citizenship = req.body.citizenship;
        var empId = 0;

        var AddEmpQuery = `
            INSERT INTO Employee(first_name, last_name, date_of_birth,medical_card_number, is_citizenship, email, occupation_id) 
            VALUES("${firstName}", "${lastName}", "${dob}", "${medCardNum}", ${citizenship}, "${email}", ${2});
        `


        // insert into employee table
        db.then(conn => {
            conn.query(AddEmpQuery, async (err, result, fields) => {
                if (err) {
                    throw err;
                }
                empId = result.insertId;

                var AddAddressQuery = `
                    INSERT INTO Employee_Address(address_line, postal_code, employee_id)
                    VALUE("${address}", "${postalCode}", ${empId});
                `;

                var addTelephoneQuery = `
                    INSERT INTO Employee_Telephone (employee_id, telephone_number) 
                    Value(  ${empId} ,'${telephone}'); 
                `;

                // insert into address table
                db.then(conn => {
                    conn.query(AddAddressQuery, (err, result, fields) => {
                        if (err) {
                            throw err;
                        }

                        // insert into telephone table
                        db.then(conn => {
                            conn.query(addTelephoneQuery, (err, result, fields) => {
                                if (err) {
                                    throw err;
                                }
                                res.status(StatusCode.SuccessOK).send({ message: "success" })
                            });
                        }).catch(err => {
                            console.log(err)
                        })
                    });
                }).catch(err => {
                    console.log(err)
                })
            });
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
})


router.put('/edit/:empId', async (req, res, next) => {
    try {
        const empId = req.params.empId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const medCardNum = req.body.medCardNum;
        const telephone = req.body.telephone;
        const dob = req.body.dob;
        const occupationId = req.body.occupationId;
        const address = req.body.address;
        const postalCode = req.body.postalCode;
        const citizenship = req.body.citizenship;

        var updateEmpQuery = `
            UPDATE Employee
            SET first_name = "${firstName}",
                last_name = "${lastName}",
                date_of_birth= "${dob}",
                medical_card_number = "${medCardNum}", 
                is_citizenship = ${citizenship},
                email = "${email}", 
                occupation_id = ${occupationId}
            WHERE employee_id = ${empId};
        `
        var updateAddressQuery = `
            UPDATE Employee_Address
            SET address_line = "${address}", 
            postal_code = "${postalCode}"
            WHERE employee_id = ${empId};
        `;

        var updateTelephoneQuery = `
            UPDATE Employee_Telephone 
            SET telephone_number = '${telephone}'
            WHERE employee_id = ${empId}; 
        `;

        // UPDATE employee table
        db.then(conn => {
            conn.query(updateEmpQuery, async (err, result, fields) => {
                if (err) {
                    throw err;
                }

                // UPDATE address table
                db.then(conn => {
                    conn.query(updateAddressQuery, (err, result, fields) => {
                        if (err) {
                            throw err;
                        }

                        // UPDATE telephone table
                        db.then(conn => {
                            conn.query(updateTelephoneQuery, (err, result, fields) => {
                                if (err) {
                                    throw err;
                                }
                                res.status(StatusCode.SuccessOK).send({ message: "success" })
                            });
                        }).catch(err => {
                            console.log(err)
                        })
                    });
                }).catch(err => {
                    console.log(err)
                })
            });
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        id = req.params.id;

        query = `DELETE FROM Employee where employee_id=${id};`
        db.then(conn => {
            conn.query(query, (err, result, fields) => {
                if (err) {
                    throw err;
                }
                console.log("user deleted")
                res.status(StatusCode.SuccessOK).send({ message: "success" })
            });
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log("TODO")
    }
})



module.exports = router
