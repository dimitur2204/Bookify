module.exports = {
    "server":{
        "port":3001,
        "cors":{
            "urls":[
                "http://localhost:4200"
            ],
            "credentials":true,
            "exposedHeaders":[]
        }
    },
    "database":{
        "connectionString":`mongodb+srv://dimitar:${process.env.DB_PASS}@cubicle-workshop.cmgb5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    }
}