const {findUsername} = require('../auth/auth-model');

async function checkUsernameFree(req, res, next) {
    try{
        const {username} = req.body;
        const users = await findUsername(username);
        if(!users.length){
            next()
        }else{
            res.status(422).json({
                message: "username taken"
            })
        }
    }catch(err){
        next(err)
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const {username} = req.body;
        const users = await findUsername(username);
        if(users.length){
            req.user = users[0]
            next()
        }else{
            res.status(401).json({
                message: "user not found"
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    checkUsernameFree,
    checkUsernameExists
}