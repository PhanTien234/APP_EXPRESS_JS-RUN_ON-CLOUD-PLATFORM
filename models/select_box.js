var pg_con = require('./pg_config')
async function gen_box(){
    // Query DB to get the table data
    let shop_query='Select shops.id,shops.name,users.role From shops JOIN users ON shops.id=users.shop_id ORDER BY Id';
    const data = await pg_con.query(shop_query)
    let box_string=
        `<table border ='1'>
            <tr>
              <form action ="/admin/select_box" method="post">
                  <label for="shop">Choose a shop:</label>
                    <select name="shops" id="shops">
                        <option value=0 selected>All shops</option>`
                            let select_items=data.rowCount;
                            for (let i=0;i<select_items;i++) {
                                if (data.rows[i].role!=="director"){
                                    box_string += `<option value=${data.rows[i].id}>${data.rows[i].name} </option>`;
                                }
                            }
              box_string+=` </select>
                <input type="submit" value="View">
      </form>`
    return box_string
}
module.exports=gen_box;