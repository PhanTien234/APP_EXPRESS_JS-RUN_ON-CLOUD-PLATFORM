var pg_con = require('./Postgresql_config/pg_config')
async function gen_box(){
    // Query DB to get the table data
    let shop_query='Select shops.id,shops.name,users.role From shops JOIN users ON shops.id=users.shop_id ORDER BY Id';
    const data = await pg_con.query(shop_query)
    // make a form select option
    let box_string=
        `<table border ='1'>
            <tr>
              <form action ="/admin/select_box" method="post">
                  <label 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    for="shop">Choose a shop:</label>
                    <select 
                        class="bg-gray-500 border border-gray-300 text-gray-900 text-sm py-2 px-5 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="shops" id="shops">
                        <option value=0 selected>All shops</option>`
                            let select_items=data.rowCount;
                            for (let i=0;i<select_items;i++) {
                                if (data.rows[i].role!=="director"){
                                    box_string += `<option value=${data.rows[i].id}>${data.rows[i].name} </option>`;
                                }
                            }
              box_string+=` </select>
                <input 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit" value="View">
      </form>`
    return box_string
}
module.exports=gen_box;