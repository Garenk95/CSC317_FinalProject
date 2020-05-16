const express = require('express');
let cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
app.use(cookieParser());

//SESSION STARTS WITH "/REGISTER" AND ENDS WITH "/END"
//"/REGISTER" SETS A COOKIE, "/END" REMOVES COOKIE
//EVERYTHING BETWEEN IS OF THAT SESSION

//Adds a new vehicle run to the system, should return a cookie called USER=[name] 
//that would be included for the other commands. Width is the width of the vehicle in cm.
app.get(`/register`, (req, res) => {
    res.send(`The app is now starting.\n
    The name is: ${req.query.name}\n
    The distance between the wheels (width) is: ${req.query.width}cm\n`);
});

//THIS IS THE ONLY DATA THAT NEEDS TO BE PROCESSED
//EVERYTHING ELSE IS STORED AND DISPLAYED
//Records the speed of the left and right wheel in cm/sec for that vehicle in the current session
app.get('/wheels', (req, res) => {
    res.send(`The left wheel is moving at ${req.query.left} cm/sec\n
    The right wheel is moving at ${req.query.right} cm/sec\n`);
});

//Records the result of the echo sensor in cm for the vehicle in the current session
app.get('/echo', (req, res) => {
    res.send(`The distance is: ${req.query.dist}\n`);
});
app.get('/line', (req, res) => {
    output = "";
    for (key in query) {
        //instead of outputting, write this to database
        output = output + `For the item: ${key} the value is ${req.query[key]}` + `\n`;
    }
    res.send(output);
});

