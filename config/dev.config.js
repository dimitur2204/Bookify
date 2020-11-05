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
        "connectionString":`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_NAME}.cmgb5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    }
}