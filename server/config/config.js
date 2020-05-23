const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/fashionStore',
        EMAIL: 'fashionstore065@gmail.com',
        PASSWORD: 'store456@'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}