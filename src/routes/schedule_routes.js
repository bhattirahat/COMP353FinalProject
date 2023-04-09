const express = require('express');
const router = express.Router();
const { StatusCode } = require('status-code-enum')
const db = require('../util/database');
 
// GET Employee schedule data and render the schedule table
router.get('/', async (req, res) => {
    selectAll = `SELECT * FROM Employee_Schedule`
 
      db.then(conn => {
        conn.query(selectAll, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                res.status(StatusCode.SuccessOK)
                .render('schedule/get', {
                    pageTitle: 'Schedule',
                    success: '',
                    data: result
                }) 
            }
        });
    }).catch(err => {
        console.log(err)
    })
});

// Render Employee schedule add form page
router.get('/add', async (req, res, next) => {
    // let employee_keys = {

    // }
    res.render('schedule/add', {
        pageTitle: 'Schedule Add',

    })
})

// CREATE Schedule from schedule-add page  
router.post('/add', async (req, res, next) => {
    // Get Schedule ID
    db.then(conn => {
        if (result.length !== 0) {
            if (result.length !== 0) {
                var scheduleCreate = `INSERT INTO Employee_Schedule (employee_id, facility_id, Work_Date, Start_Time, End_Time, Hours) VALUES ("${req.body.employee_id}", ${req.body.facility_id}, ${req.body.work_date}, ${req.body.start_time}, ${req.body.end_time}, ${req.body.hours})`;

                conn.query(scheduleCreate, (err, result, fields) => {
                    if (err) {
                        throw err;
                    }
                    if (result.length !== 0) {
                        console.log(`A new employee schedule was registered for employee with ID: ${req.body.employee_id}`);
                    }
                });
            }
        }
    }).catch(err => {
        console.log(err)
    })
    res.redirect('/schedule')
})

// DELETE Schedule by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteById = `delete from Employee_Schedule where schedule_id="${id}"`

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

// Render Schedule edit form page
router.get('/edit/:id', async (req, res, next) => {
    console.log(req._parsedUrl)
    res.render('schedule/edit', {
        pageTitle: 'Schedule Edit',
        schedule_id: req.params.id,
        employee_id: req._parsedUrl["query"].split("=")[1]
    })
});

// EDIT Schedule By ID
router.post('/edit/:id', async (req, res, next) => {
    db.then(conn => {
        if (result.length !== 0) {
            let updateById = `UPDATE Employee_Schedule SET WorkDate = ${req.body.work_date}, Start_Time="${req.body.start_time}", End_time=${req.body.end_time}, Hours=${req.body.hours} where schedule_id=${req.body.schedule_id};`
            conn.query(updateById, (err, result, fields) => {
                if (err) {
                    throw err;
                }
                if (result.length !== 0) {
                    console.log(`Schedule ${req.body.schedule_id}'s data has been updated for employee with ID: ${req.body.employee_id}`);
                }
            });
        }
        res.redirect('/schedule')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;