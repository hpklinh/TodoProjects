const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Kl0356584807",
    host: "localhost",
    port:5432,
    database: "perntodo"
});

module.exports = pool;