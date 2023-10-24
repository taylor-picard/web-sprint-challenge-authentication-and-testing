const db = require('../../data/dbConfig');

function findId(user_id){
    return db('users').select('user_id', 'username')
    .where('user_id', user_id).first()
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