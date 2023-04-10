const cron = require('node-cron');
const db = require('./database')

const seconds = ''
const minutes = '0'
const hour = '1'
const day = '*'
const month = '*'
const day_of_week = '7'

module.exports = cron.schedule(`${seconds} ${minutes} ${hour} ${day} *${month} ${day_of_week}`, async () => {
    console.log('Running Automated Emails');

    query = `
    insert into Email_Log(facility_id, Email_Sent_Date, Receiver_id, Email_Subject, Body)
    select 
        t1.facility_id,
        current_date(),
        t2.employee_id, 
        CONCAT(t1.name, ' Schedule for ' ,DATE_FORMAT(DATE_ADD(current_date(), interval 1 day), '%W %e-%b-%Y'), ' to ', DATE_FORMAT(DATE_ADD(current_date(), interval 8 day), '%W %e-%b-%Y')) as subject,
        CONCAT(
            'Facility Name: ', t1.name, '\n',
            'Address: ' , t1.address, '\n',
            'First Name: ', t3.first_name, '\n',
            'Last Name: ', t3.last_name, '\n',
            'Email: ', t3.email, '\n',        
            'Schedule: ',GROUP_CONCAT(CONCAT(DATE_FORMAT(t2.work_date, '%W'), ' ', t2.start_time, '-', t2.end_time) ORDER BY t2.work_date SEPARATOR '; ')) AS Body
    from 
        Facility t1
        inner join Employee_Schedule t2 on t1.facility_id = t2.facility_id
        inner join Employee t3 on t2.employee_id = t3.employee_id
    where 
        (t2.Work_Date <= DATE_ADD('2023-04-09', interval 1 week)) AND
        (t2.Work_Date) >= '2023-04-09'
    group by t2.employee_id, t1.facility_id
    `

    db.then(conn => {
        conn.query(query, (err, result, fields) => {
            if (err) {
                throw err;
            }
            if (result.length !== 0) {
                console.log("Email Sent!")
            }
            // conn.end();
        });
    }).catch(err => {
        console.log("error is " + err)
    })
});