const express = require('express');
const createDB = require('./node_create_DB');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
app.use(cookieParser());

let sessionID = 0;

app.get(`/register`, (req, res) => {
    //------->need to write better code to generate a uniqueID<-----------
    var date = new Date();
    sessionID++;
    createDB.addSession(sessionID, req.query.name, date, req.query.width, req.query.time);
    res.send('A new session has been added to the session table');
});

app.get('/wheels', (req, res) => {
    const date = new Date();
    createDB.addSessionData(sessionID, 'left_wheel', req.query.left, date, req.query.time, '/wheels');
    createDB.addSessionData(sessionID, 'right_wheel', req.query.right, date, req.query.time, '/wheels');
    res.send(`New wheel data has been stored in session_data table`);
});

app.get('/echo', (req, res) => {
    const date = new Date();
    createDB.addSessionData(sessionID, 'dist', req.query.dist, date, req.query.time, '/echo');
    res.send(`New distance data has been stored in session_data table`);
});

app.get('/line', (req, res) => {
    const date = new Date();
    for (key in req.query) {
        createDB.addSessionData(sessionID, key, req.query[key], date, req.query.time, '/line');
    }
    res.send("New line data has been stored in session_data table");
});

app.get(`/other`, (req, res) => {
    const date = new Date();
    for (key in req.query) {
        createDB.addSessionData(sessionID, key, req.query[key], date, req.query.time, '/other');
    }
    res.send("New other data has been stored in session_data table");
});

app.get(`/end`, (req, res) => {
    res.send(`session ending!`);
});
