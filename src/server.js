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

db
.then(conn=>{
    conn.query(`SELECT * from Employee`, (err, result, fields) => {
        if (err) throw err;
        console.log("SQL Query Result-- ", result);
        if (result.length !== 0) {  //considering SQL Select statement
            result = result[0];
            //perform your required work on result
        }
    });
}).then(err=>{
    console.log(err)
})

// Middleware
// Parse the body request into json format
app.use(express.json())
// Parse the body request from the URL into json format
app.use(express.urlencoded({ extended: true }));
// serve css file statically
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, '../' ,'node_modules', 'bootstrap', 'dist', 'css')));

// redirect user to employee endpoint
const empRoutes = require('./routes/employee_routes');
app.use('/employee', empRoutes);

// redirect user to 404 page
app.use((req, res, next) => {
    res
    .status(StatusCode.ClientErrorNotFound)
    .render('404',{
        pageTitle: '404 Error'
    });
    //res.status(StatusCode.ClientErrorNotFound).sendFile(path.join(rootDir, 'views', '404.html'))
})

const server = app.listen(3000, () => {
    console.log("backend server listening on port", 3000)
});