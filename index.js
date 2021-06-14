'use strict'

const http = require('http');
const app = require('./app.js');
const io = require('./utils/socket');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

async function Server() {
    /**
     * Add external services init as async operations (db, redis, etc...)
     * e.g.
     * await sequelize.authenticate()
     */
    return http.createServer(app).listen(port);
}

Server()
    .then(server => {
        io.attach(server, {
            cors: { origin: "*", }
        });
        console.log(`Server listening at http://${hostname}:${server.address().port}`);
    })
    .catch(error => {
        setImmediate(() => {
            console.error('Server Error:');
            console.error(error);
            process.exit();
        });
    });