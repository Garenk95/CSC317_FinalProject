// require('./server/node_create_DB')
require('./server/server')

const store = require('data-store')({
    path: `${process.cwd()}/src/database` + '/database.json',
})

store.set('a', 'b')
const _ = store.get('a')
console.log(`!!! `, _)
