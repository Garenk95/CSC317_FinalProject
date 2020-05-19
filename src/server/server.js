const express = require('express');
const createDB = require('./node_create_DB');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
app.use(cookieParser());
app.use(cors());

function getCookie(req) {
    let cookieName = req.cookies.USER;
    let obj = sessionObjArray.find((session) => {
        return session.cookieName == cookieName;
    });
    let returnObj = {
        id: obj.cookieID,
        cookieName: req.cookies.USER
    };
    return returnObj;
}

let sessionID = 0;
let sessionObjArray = [];

app.get(`/register`, (req, res) => {
    console.log("WE GOT TO THIS POINT IN THE register FUNCTION");
    //------->need to write better code to generate a uniqueID<-----------
    var date = new Date();
    sessionID++;
    let sessionObj = {
        cookieName: req.query.name,
        cookieID: sessionID
    };
    sessionObjArray.push(sessionObj);
    createDB.addSession(sessionID, req.query.name, date, req.query.width, req.query.time);
    res.cookie(`USER`, req.query.name).send('cookie set');
    //res.send('A new session has been added to the session table');
});

app.get('/wheels', (req, res) => {
    const date = new Date();
    let obj = getCookie(req);
    createDB.addSessionData(obj.id, obj.cookieName, 'left_wheel', req.query.left, date, req.query.time, '/wheels');
    createDB.addSessionData(obj.id, obj.cookieName, 'right_wheel', req.query.right, date, req.query.time, '/wheels');
    res.send(`New wheel data has been stored in session_data table`);
});

app.get('/echo', (req, res) => {
    const date = new Date();
    let obj = getCookie(req);
    createDB.addSessionData(obj.id, obj.cookieName, 'dist', req.query.dist, date, req.query.time, '/echo');
    res.send(`New distance data has been stored in session_data table`);
});

app.get('/line', (req, res) => {
    const date = new Date();
    let obj = getCookie(req);
    for (key in req.query) {
        createDB.addSessionData(obj.id, obj.cookieName, key, req.query[key], date, req.query.time, '/line');
    }
    res.send("New line data has been stored in session_data table");
});

app.get(`/other`, (req, res) => {
    const date = new Date();
    let obj = getCookie(req);
    for (key in req.query) {
        createDB.addSessionData(obj.id, obj.cookieName, key, req.query[key], date, req.query.time, '/other');
    }
    res.send("New other data has been stored in session_data table");
});

app.get(`/end`, (req, res) => {
    // const date = new Date();
    // let sessionName = sessionObjArray[req.name].
    //     createDB.endSession(req.);
    let obj = getCookie(req);
    console.log('getCookie was called');
    const date = new Date();
    console.log(`id is: ${obj.id}, and the cookieName is: ${obj.cookieName}`);
    createDB.endSession(obj.id, obj.cookieName, date, req.query.time);
    console.log("WE GOT TO THIS POINT IN THE end FUNCTION");
});

//following functions are for front end js files to get data from database

app.get(`/getActiveSessions`, async (req, res) => {
    let activeSessionArray = await createDB.getActiveSessions();
    console.log('sending response to active.js');
    res.send(activeSessionArray);
});

