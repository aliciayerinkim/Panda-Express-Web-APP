const {Pool} = require('pg');
const dotenv = require('dotenv').config();

// const pool = new Pool({
//     host: 'csce-315-db.engr.tamu.edu',
//     user: 'csce315_908_kim',
//     database: 'csce315_908_81',
//     password: '131003034',
//     port: 5432,
//     ssl: {rejectUnauthorized: false}
// })

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});



module.exports = pool;