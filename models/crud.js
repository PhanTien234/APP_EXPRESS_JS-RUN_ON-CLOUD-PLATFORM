var pg_con = require('./Postgresql_config/pg_config');
async function crud(req_body){
    let id = req_body.id;
    let product_name = req_body.name;
    let price = req_body.price;
    let quantity = req_body.quantity;
    let shop_id = req_body.shop_id;
    if (req_body.crud === 'update'){
     // query to update product
        var query = {
            text: `UPDATE products
                    SET name = $2, price = $3, quantity = $4
                    WHERE id = $1;`,
            values: [id, product_name, price, quantity]
        }
    } else if (req_body.crud === 'delete') {
    // query to delete product
        var query = {
            text: `DELETE FROM products
                    WHERE id =$1;`,
            values: [id]
        }
    } else {
    // query to insert product
        var query = {
            text: `INSERT INTO products VALUES ($1, $2, $3, $4, $5);`,
            values: [id , product_name, price, quantity, shop_id]
        }
    }
    results = await pg_con.query(query);
    return results
}
module.exports = crud;