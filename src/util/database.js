const mysql = require('mysql2')
const { Client } = require('ssh2');
const sshClient = new Client();
require('dotenv').config()

// const pool =  mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
// });

// module.exports = pool.promise();

const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD
}
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
            if (err) reject(err);
            const updatedDbServer = {
                ...dbServer,
                stream
            };
            const connection =  mysql.createConnection(updatedDbServer);
            connection.connect((error) => {
                if (error) {
                    reject(error);
                }
                resolve(connection);
            });
        });
    }).connect(tunnelConfig);
});

module.exports = SSHConnection;