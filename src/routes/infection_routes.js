const express = require('express');
const router = express.Router();
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');
 
// GET Infection data and render the infection table
router.get('/', async (req, res) => {
    selectAll = `SELECT a.date, a.employee_id, a.infection_id, b.type FROM Infection a INNER JOIN Infection_Type b ON a.infection_type_id=b.infection_type_id`
 
      db.then(conn => {
        conn.query(selectAll, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                res.status(StatusCode.SuccessOK)
                .render('infection/get', {
                    pageTitle: 'Infection',
                    success: '',
                    data: result
                }) 
            }
        });
    }).catch(err => {
        console.log(err)
    })
});

// Render Infection add form page
router.get('/add', async (req, res, next) => {
    res.render('infection/add', {
        pageTitle: 'Infection Add'
    })
}) 

// CREATE Infection from infection-add page  
router.post('/add', async (req, res, next) => {
    let getInfectionTypeIdFetch = `SELECT infection_type_id FROM infection_type WHERE type="${req.body.infection_type}"`

    // Get infection type ID
    db.then(conn => {
        conn.query(getInfectionTypeIdFetch, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                var infectionCreate = `INSERT INTO Infection (date, employee_id, infection_type_id) VALUES ("${req.body.date}", ${req.body.employee_id}, ${data[0]["infection_type_id"]})`;

                conn.query(infectionCreate, (err, result, fields) => {
                    if (err) {
                        throw err;
                    }
                    if (result.length !== 0) {
                        console.log(`A new infection was registered for employee with ID: #{req.body.employee_id}`);
                    }
                });
            }
        });
        res.redirect('/infection')
    }).catch(err => {
        console.log(err)
    })

    res.redirect('/infection')
})

// DELETE Infection by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteById = `delete from Infection where infection_id="${id}"`

    db.then(conn => {
        conn.query(deleteById, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                res.json({ message: "Deleted with success" });
            }
        });
    }).catch(err => {
        console.log(err)
    })
})

// Render Infection edit form page
router.get('/edit/:id', async (req, res, next) => {
    res.render('infection/edit', {
        pageTitle: 'Infection Edit',
        infection_id: req.params.id,
        employee_id: req._parsedUrl["query"].split("=")[1]
    })
});

// EDIT Infection By ID
router.post('/edit/:id', async (req, res, next) => {
    let getInfectionTypeIdFetch = `SELECT infection_type_id FROM Infection_Type WHERE type="${req.body.infection_type}"`
    
    // Get infection type ID
    db.then(conn => {
        conn.query(getInfectionTypeIdFetch, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                let updateById = `UPDATE Infection SET infection_type_id = ${data[0]["infection_type_id"]}, date="${req.body.date}", employee_id=${req.body.employee_id} where infection_id=${req.body.infection_id};`
 
                conn.query(updateById, (err, result, fields) => {
                    if (err) {
                        throw err;
                    }
                    if (result.length !== 0) {
                        console.log(`Infection ${req.body.infection_id}'s data has been updated for employee with ID: ${req.body.employee_id}`);
                    }
                });
            }
        });
        res.redirect('/infection')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;