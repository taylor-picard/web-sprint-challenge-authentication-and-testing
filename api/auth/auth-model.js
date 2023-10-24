const db = require('../../data/dbConfig');

function findUsername(username) {
    return db('users')
        .where('username', 'like', `%${username}%`)
}

module.exports = {
    findUsername
}