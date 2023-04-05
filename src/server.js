const express = require('express')
const app = express();
const path = require('path')
const rootDir = require('./util/path')
//const db = require('./util/database')
const { StatusCode } = require('status-code-enum')
const db = require('./util/database');

// Set variable globally on the express application
// Setting the dynamic template engine
app.set('view engine', 'ejs');
// Setting where to find the views
app.set('views', path.join(__dirname, 'views'));

// db.then(conn => {
//     conn.query(`SELECT * from Employee`, (err, result, fields) => {
//         if (err) {
//             throw err;
//         }
//         console.log("SQL Query Result-- ", result);
//         if (result.length !== 0) {
//             result = result[0];
//             //perform your required work on result
//         }
//         conn.end();
//     });
// }).catch(err => {
//     console.log(err)
// })


// Middleware
// Parse the body request into json format

app.use(express.json())
// Parse the body request from the URL into json format
app.use(express.urlencoded({ extended: true }));
// serve css file statically
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, '../', 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(rootDir, '../', 'node_modules', 'bootstrap', 'dist', 'js'))); // redirect bootstrap JS

const server = app.listen(3000, () => {
    console.log("backend server listening on port", 3000)
});

// redirect user to employee endpoint
const empRoutes = require('./routes/employee_routes');
app.use('/employee', empRoutes);

// redirect user to facility endpoint
const facRoutes = require('./routes/facility_routes');
app.use('/facility', facRoutes);

// redirect user to vaccination endpoint
const vaccRoutes = require('./routes/vaccination_routes');
app.use('/vaccination', vaccRoutes);

const homeRoute = require('./routes/homepage_routes');
app.use('/', homeRoute);

const infectionRoute = require('./routes/infection_routes');
app.use('/infection', infectionRoute);

const scheduleRoute = require('./routes/schedule_routes');
app.use('/schedule', scheduleRoute);

app.get('/vaccination-edit/:id', async (req, res, next) => {
    //console.log(req.params.id);
    res.render('vaccination-edit', {
        pageTitle: 'Vaccination Edit',
        id:req.params.id
    })

})
app.get('/vaccination-add', async (req, res, next) => {
    //console.log(req.params.id);
    res.render('vaccination-add', {
        pageTitle: 'Vaccination Add'
    })

})

app.post('/vaccination-add-submit', async (req, res, next) => {
    db.then(conn => {
        conn.query(`Insert into Vaccination(Vaccine_id, Dose, employee_id, facility_id, Vaccination_date) 
        Values("${req.body.VType}","${req.body.Dose}","${req.body.EID}", "${req.body.FID}", "${req.body.Date}")`)
})
res.redirect('/vaccination')
})

app.post('/vaccination-edit-submit/:id', async (req, res, next) => {
    //console.log(req.body);
    //console.log(req.params.id);
    db.then(conn => {
        conn.query(`UPDATE Vaccination
        SET Vaccine_id ="${req.body.VType}", Dose = "${req.body.Dose}", employee_id="${req.body.EID}", facility_id="${req.body.FID}", Vaccination_date="${req.body.Date}"
        where Vaccination_id="${req.params.id}";`)
})
res.redirect('/vaccination')
})

app.delete('/:id', (req,res)=>{
    const id = req.params.id;
    //console.log(id)
     db.then(conn => {
        conn.query(`Delete from Vaccination where Vaccination_id="${id}"`)
    
})
res.json({message:"Testing 1"});
})

// redirect user to 404 page
app.use((req, res, next) => {
    res
        .status(StatusCode.ClientErrorNotFound)
        .render('404', {
            pageTitle: '404 Error'
        });
    //res.status(StatusCode.ClientErrorNotFound).sendFile(path.join(rootDir, 'views', '404.html'))
})


