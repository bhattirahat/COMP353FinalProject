const express = require('express');
const router = express.Router();
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');
 
// GET Infection data and render the infection table
router.get('/', async (req, res) => {
    selectAll = `SELECT a.date, a.employee_id, a.infection_id, b.type FROM infection a INNER JOIN infection_type b ON a.infection_type_id=b.infection_type_id`
    db.execute(
        selectAll,
        function(err, data) {
            if(err) throw err;
            if(data.length >= 1) {
                res.status(StatusCode.SuccessOK)
                .render('infection/infection', {
                    pageTitle: 'Infection',
                    success: '',
                    data: data
            }) 
            } else {
                console.log("No results were returned.");
            }
        }
      );
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
    db.execute(
        getInfectionTypeIdFetch,
        function(err, data) {
            if(err) throw err;
            var infectionCreate = `INSERT INTO infection (date, employee_id, infection_type_id) VALUES ("${req.body.date}", ${req.body.employee_id}, ${data[0]["infection_type_id"]})`;
          
            // Create an infection
            db.execute(
                infectionCreate,
                function(err, data) {
                    if(err) throw err;
                    console.log(`A new infection was registered for employee with ID: #{req.body.employee_id}`);
                }
            )
        }
    )
    res.redirect('/infection')
})

// DELETE Infection by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteById = `delete from infection where infection_id="${id}"`
    db.execute(
        deleteById,
        function(err, data) {
            if(err) throw err;
            console.log(data)
        }
    )
    res.json({ message: "Deleted with success" });
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
    let getInfectionTypeIdFetch = `SELECT infection_type_id FROM infection_type WHERE type="${req.body.infection_type}"`
        // Get infection type ID
        db.execute(
            getInfectionTypeIdFetch,
            function(err, data) {
                if(err) throw err;
                updateById = `UPDATE infection SET infection_type_id = ${data[0]["infection_type_id"]}, date="${req.body.date}", employee_id=${req.body.employee_id} where infection_id=${req.body.infection_id};`
 
                // Edit an infection
                db.execute(
                    updateById,
                    function(err, data) {
                        if(err) throw err;
                        console.log(`Infection ${req.body.infection_id}'s data has been updated for employee with ID: ${req.body.employee_id}`);
                    }
                )
            }
        )

    res.redirect('/infection')
})

module.exports = router;