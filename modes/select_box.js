async function gen_box(){
    let box_string = ` 
    <lable for = "cars">Choose car a shop</lable>
    <select name="cars" id="car>
    <option value="home.html">home</option>
    <option value="team.html">team</option>
    <option value="contact.html" selected>contact</option>
   </select>`
   return box_string;
}
module.exports = gen_box;