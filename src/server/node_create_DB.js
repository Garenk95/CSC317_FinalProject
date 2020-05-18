var mysql = require('mysql')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    port: '3306',
    password: '',
})

con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    con.query('CREATE DATABASE mydb', function (err, result) {
        if (err) throw console.log('didnt work')
        console.log('Database created')
    })
})
