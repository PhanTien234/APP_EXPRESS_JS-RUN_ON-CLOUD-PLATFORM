const Pool = require('pg').Pool
const pg_con = new Pool({
    user: 'adylywirgshulz',
    host: 'ec2-23-20-140-229.compute-1.amazonaws.com',
    database: 'de575n8rtbdrrv',
    password: '3f398292682d08081097e03c9e575f9e74003a752bc4638687cd4b502b91d1e2',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
  });
  module.exports = pg_con;