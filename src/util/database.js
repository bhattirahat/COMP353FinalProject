const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
require('dotenv').config()

// create the connection to database depending on the environment
// local setup when development NODE_ENV flag is used, otherwise SSH connection with school's DB
let connection;
if(process.env.NODE_ENV == "development") {
    console.log("In development mode:");
    connection = mysql.createConnection({
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        user: process.env.DEV_DB_USERNAME,
        database: process.env.DEV_DB_DATABASE,
        password:process.env.DEV_DB_PASSWORD
      });
} else {
    console.log("In production mode:")
    const dbServer = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true  
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

    connection = new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            sshClient.forwardOut(
                forwardConfig.srcHost,
                forwardConfig.srcPort,
                forwardConfig.dstHost,
                forwardConfig.dstPort,
                (err, stream) => {
                    console.log(err)
                    if (err) {
                        console.log(err);
                        reject(err);
                    } 
                    const updatedDbServer = {
                        ...dbServer,
                        stream
                    };
                    const connection =  mysql.createConnection(updatedDbServer);
                    connection.connect((error) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        resolve(connection);
                    });
                });
        }).connect(tunnelConfig);
    });    
}

module.exports = connection;