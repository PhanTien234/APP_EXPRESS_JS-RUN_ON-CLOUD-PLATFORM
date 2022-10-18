var pg_con = require('./pg_config')
async function authen(user, pass){
    let authenticated = false;
    let shop_id;
    const auth_query ={
        text: 'SELECT * FROM users WHERE name = $1 AND password = $2',
        values: [user, pass]
    };
    var query_data = await pg_con.query(auth_query);
    if(query_data.rowCount ==1){
        authenticated = true;
        shop_id = query_data.rows[0].shop_id;
    }
    // console.log(authenticated);
    return [authenticated, shop_id];

}
module.exports = authen;