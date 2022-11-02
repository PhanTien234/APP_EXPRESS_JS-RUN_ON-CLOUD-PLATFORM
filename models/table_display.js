var pg_con = require('./Postgresql_config/pg_config')
// define of function to display products table for a shop
 async function display_product(shop_id){
    // Query DB to get the table data
    let pro_query;
    if(shop_id == 0){
         pro_query = 'SELECT * FROM products'
    }else{
         pro_query ={
            text: 'SELECT * FROM products WHERE shop_id = $1',
            values: [shop_id]
        }
    }
    const data = await pg_con.query(pro_query)
    // make a color for button
    let table_string = `
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
   
    .heading {
      font-weight: bold;
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      color: yellow;
    }
    </style>
    </head>
    <body>
    <h2 class="heading">Table products</h2>
    <table class="table">
      <tr>`;
        //display all table's header
        let num_fields = data.fields.length;
        for( let i = 0; i< num_fields; i++){
            table_string += `<th>${data.fields[i].name}</th>`
        };
        table_string += ` <th>actions</th>`
        table_string += `</tr>`;
        //display all rows of table
        let num_rows = data.rowCount;
        for (let i = 0; i < num_rows; i++){
            table_string+=`<form action="/users/crud" method="post">`
            table_string += `<tr>`;
            for (let j =0; j<num_fields; j++){
                let field_name = data.fields[j].name;
                let cell = data.rows[i][field_name];
                table_string += `<td><input type="text" name=${field_name} value=${cell}></td>`;
            }
            // make a form delete and update button
            table_string += 
            `<td>
            <button type='submit' name='crud' 
              class= "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value='delete'>Delete</button>
            <button type='submit' 
              class= "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" name='crud' value='update'>Update</button>
            </td>
            </tr></form>`
        }
        //add an empty row and insert button at the end of row
        table_string += `<tr><form action="/users/crud" method="post">`
        for (let j =0; j<num_fields; j++){
            let field_name = data.fields[j].name
            table_string += `<td><input type="text" name=${field_name}></td>`;
        }
        // make a form Add button
        table_string += `
        <td>
            <button type='submit' 
              class= "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" name='crud' value='add'>Add</button>
        </td> `;
    table_string += `</tr></form></table>`;
    // console.log("DATA: -->");
    // console.log(data);

return table_string;
}


module.exports = display_product;