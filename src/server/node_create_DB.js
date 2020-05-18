var mygssql = require('mysql')

var con = mysql.createConnection({
    host: 'http://localhost:5432',
    user: 'user',
    password: 'cscdb',
})

con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    con.query('CREATE DATABASE mydb', function (err, result) {
        if (err) throw console.log('didnt work')
        console.log('Database created')
    })
})
