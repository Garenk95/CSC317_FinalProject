var mygssql = require('mysql')

var con = mysql.createConnection({
    host: 'http://localhost:3000',
    user: 'user',
    password: 'Mynameisgaren1',
})

con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    con.query('CREATE DATABASE mydb', function (err, result) {
        if (err) throw console.log('didnt work yo')
        console.log('Database created')
    })
})
