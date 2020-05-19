var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'garen1',
    port: '8889',
    password: '',
    database: 'project_db'
});

//this is the first connection made, when the server begins
//here we create database "project_db"
//and tables "sessions" and "session_data"
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    console.log('Attemping to create Database "project_db"');
    con.query('CREATE DATABASE IF NOT EXISTS project_db', function (error, result) {
        if (error) throw console.log('could not make database project-db');
        console.log('project_db created');
    });
    console.log('Attemping to create table "sessions"');
    con.query('CREATE TABLE IF NOT EXISTS sessions (sessionID VARCHAR(255), name VARCHAR(255), date VARCHAR(255), isActive VARCHAR(255), width VARCHAR(255), time VARCHAR(255))', function (err, res) {
        if (err) throw err;
        console.log('"sessions" table created');
    });
    console.log('Attempting to create table "session_data"');
    con.query('CREATE TABLE IF NOT EXISTS session_data(sessionID VARCHAR(255), name VARCHAR(255), item VARCHAR(255), value VARCHAR(255), date VARCHAR(255), time VARCHAR(255), url VARCHAR(255))', function (error, result) {
        if (error) throw error;
        console.log('"session_data" created');
    });
});

module.exports = {
    addSession: function (id, name, date, width, time) {
        var sql = `INSERT INTO sessions (sessionID, name, date, isActive, width, time) VALUES (${id}, '${name}', '${date}', 'y', ${width}, ${time})`;
        con.query(sql, (err, res) => {
            if (err) throw err;
            console.log("WE GOT TO THIS POINT IN THE addSession FUNCTION");
            console.log("record inserted into 'sessions'");
        });
    },
    addSessionData: function (id, name, item, value, date, time, url) {
        var sql = `INSERT INTO session_data(sessionID, name, item, value, date, time, url) VALUES (${id}, '${name}', '${item}', ${value}, '${date}', ${time}, '${url}')`;
        con.query(sql, (err, res) => {
            if (err) throw err;
            console.log("record inserted into 'session_data'");
        });
    },
    endSession: function (id, name, date, time) {
        //modify session in session table to change active from y to n
        var sql = `INSERT INTO session_data(sessionID, name, item, value, date, time, url) VALUES (${id}, '${name}', 'N/A', 'N/A', '${date}', ${time}, '/end')`;
        con.query(sql, (err, res) => {
            if (err) throw err;
            console.log("inserting final session data for user");
        });
        sql = `UPDATE sessions SET isActive = 'n' WHERE name = '${name}'`;
        con.query(sql, (err, res) => {
            if (err) throw err;
            console.log("ended a session, changing isActive to 'n'");
        });
    },
    getActiveSessions: async () => {
        //go into sessions table
        //check if there is data
        let test = [];
        var sql = `SELECT * FROM sessions WHERE isActive = 'y'`;
        const promise = new Promise((resolve, reject) => {
            con.query(sql, (err, res) => {
                if (err) throw err;
                //console.log(res);
                for (let [key, value] of Object.entries(res)) {
                    let obj = {
                        sessionID: value.sessionID,
                        name: value.name,
                        date: value.date,
                        isActive: value.isActive,
                        width: value.width,
                        time: value.time
                    };
                    test.push(obj);
                }
                resolve(test);
            });
        });
        return await promise;
    }
};