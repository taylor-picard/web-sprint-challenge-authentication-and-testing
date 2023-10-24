const db = require('../../data/dbConfig');

function findId(id){
    return db('users').select('id', 'username')
    .where('id', id).first()
}

function findUsername(username) {
    return db('users')
        .where('username', 'like', `%${username}%`)
}

async function addUser(user){
    const [id] = await db('users').insert(user)
    return findId(id)
}

module.exports = {
    findId,
    findUsername,
    addUser
}