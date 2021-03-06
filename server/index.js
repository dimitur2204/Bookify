global.__basedir = __dirname;

const path = require('path');
require('dotenv').config({path:path.resolve('./config/.env')});
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { server: {port, cors: corsConfig}, database} = require('./config');
const db = require('./db');
const api = require('./api');
const {tapLog} = require('./utils/tap-log');
const globalErrorHandler = require('./global-error-handler');
const { cloudinaryConfig } = require('./api/middleware/files/cloudinary');
const swaggerUi = require('swagger-ui-express');

const app = express();

const apiDocs = require('./swagger/swagger.json');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

app.use(cors({
    origin: corsConfig.urls,
    credentials: corsConfig.credentials,
    exposedHeaders: corsConfig.exposedHeaders
}));

app.use(cookieParser());
app.use(cloudinaryConfig);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__basedir, 'static')));

api.connect('/api/v1',app);

app.use('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.use(globalErrorHandler);

const appListen = () => {
    return new Promise((res,_) => {
        app.listen(port,() => res());
    });
}

db.connect(database.connectionString)
    .catch((err) => tapLog('Error connection to database!'))
    .then(tapLog('Successfully connected to database'))
    .then(appListen)
    .then(tapLog(`Server is listening on :${port}`))
    .catch(err => console.error(`Server error: ${err.message}`));