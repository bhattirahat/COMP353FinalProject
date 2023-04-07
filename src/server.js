const express = require('express')
const app = express();
const path = require('path')
const rootDir = require('./util/path')
const db = require('./util/database')
const { StatusCode } = require('status-code-enum')

// Set variable globally on the express application
// Setting the dynamic template engine
app.set('view engine', 'ejs');
// Setting where to find the views
app.set('views', path.join(__dirname, 'views'));

// Middleware
// Parse the body request into json format
app.use(express.json())
// Parse the body request from the URL into json format
app.use(express.urlencoded({ extended: true }));
// serve css file statically
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, '../', 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(rootDir, '../', 'node_modules', 'bootstrap', 'dist', 'js'))); // redirect bootstrap JS

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
app.use('/homepage', homeRoute);

const infectionRoute = require('./routes/infection_routes');
app.use('/infection', infectionRoute);

const scheduleRoute = require('./routes/schedule_routes');
app.use('/schedule', scheduleRoute);

app.use('/', homeRoute);

// redirect user to 404 page
app.use((req, res, next) => {
    res
        .status(StatusCode.ClientErrorNotFound)
        .render('404', {
            pageTitle: '404 Error'
        });
    //res.status(StatusCode.ClientErrorNotFound).sendFile(path.join(rootDir, 'views', '404.html'))
})


const server = app.listen(3000, () => {
    console.log("backend server listening on port", 3000)
});

// select Es.employee_id,concat(Employee.first_name," ",Employee.last_name) as Doctor,
// count(Distinct Es.facility_id) as N_OF_Facility,
// City.name as City,
// Occupation.Type
// from Employee_Schedule as Es
// join Facility on Facility.facility_id = Es.facility_id
// join PostalCode on PostalCode.postal_code =Facility.postal_code
// join City on PostalCode.city_id = City.city_id
// join Province on Province.province_id  = City.province_id
// --
// join Employee on  Es.employee_id = Employee.employee_id
// join Occupation on Employee.occupation_id = Occupation.occupation_id
// --
// join Employee_Address on Employee_Address.employee_id = Employee.employee_id
// join PostalCode as PC on Employee_Address.Postal_Code = PC.postal_code
// join City AS CT on PC.city_id = CT.city_id

// where Province.name = "Quebec" and Occupation.Type = "Doctor"
// GROUP BY Es.employee_id
// order by City Asc, N_OF_Facility DESC