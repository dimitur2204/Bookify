const {Router} = require('express');

module.exports.connect = (path, app) => {
    const router = Router();

    router.get('/', (req,res) => {
        res.send('Hello world');
    })

    app.use(path,router);
}