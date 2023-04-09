const cron = require('node-cron');
const db = require('../util/database')

const seconds = '0,30'
const minutes = '14,15,16,17,18,19,21'
const hour = '15'
const day = '*'
const month = '*'
const day_of_week = '7'

module.exports = cron.schedule(`${seconds} ${minutes} ${hour} ${day} *${month} ${day_of_week}`, () => {
    console.log('Running Automated Emails');


    query1 = `
    select t1.facility_id, t1.name, t2.employee_id
    from Facility t1
    inner join Employee_Schedule t2 on t1.facility_id = t2.facility_id
    where 
        (t2.Work_Date <= DATE_ADD('2023-04-09', interval 1 week)) AND
        (t2.Work_Date) >= '2023-04-09'
    group by t2.employee_id;
    `
    db.then(conn => {
        conn.query(query1, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                console.log(result[0].facility_id)

            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is " + err)
    })
});