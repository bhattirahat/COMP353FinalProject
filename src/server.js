const express = require('express')
const app = express();
const path = require('path')
const { StatusCode } = require('status-code-enum')


// Middleware
// Parse the body request into json format
app.use(express.json())
// Parse the body request from the URL into json format
app.use(express.urlencoded({ extended: true }));
// serve css file statically
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '../' ,'node_modules', 'bootstrap', 'dist', 'css')));

// redirect user to employee endpoint
const empRoutes = require('./routes/employee_routes');
app.use('/employee', empRoutes);

app.use((req, res, next) => {
    res.status(StatusCode.ClientErrorNotFound).sendFile(path.join(__dirname, 'views', '404.html'))
})


const server = app.listen(3000, () => {
    console.log("backend server listening on port", 3000)
});