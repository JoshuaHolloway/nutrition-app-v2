let num_rows = 1;

// ==============================================

// const grid = document.querySelector('.grid-container');
const main_table = document.querySelector('#main-table');
const main_table_body = main_table.querySelector('tbody');
const add_food_button = document.querySelector('#add-food-button');

// ==============================================

// Listener for 'Add Food' button to add new row to table
add_food_button.addEventListener('click', () => {
  
  num_rows++;
   
  // - - - - - - - - - - - - - - - - - - - - - - -

  const known_foods_not_in_table_obj = known_foods_not_in_table();
  console.log(known_foods_not_in_table_obj);

  // - - - - - - - - - - - - - - - - - - - - - - -
  
  // Change HTML 
  const new_row = document.createElement('tr');   // table-row
  //const new_cell = document.createElement('td');  // table-data-cell
  new_row.innerHTML = 
    `<th scope="row">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Choose Food
        </button>
        <ul id="food3_dropdown" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a id="food_option_1" class="dropdown-item" href="#">Action</a></li>
        </ul>
      </div>
    </th>

    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    `;

  // RIGHT HERE (mon)
  // -This new row has a button with id food-btn-1
  // -Target this to change the innerText of the button after the drop down menu is selected.
  // -Grab known foods (not already in table - write function for this) and use these to loop and dynamically add the li's inside the ul in the `` above.
  // -Place event listeners on these li-components, and update the button#food-1-btn innerText with the food name clicked.
  // -Update the other columns with the corresponding food's data.
  // -
  
  // Add new row to table
  main_table_body.append(new_row);
  
  // Set inner text in drop down:
  // -id=food# based on row-num
  append_li('#food3_dropdown', 'food_option_1', 'New Food 1');
  append_li('#food3_dropdown', 'food_option_2', 'New Food 2');
  append_li('#food3_dropdown', 'food_option_3', 'New Food 3');

  // - - - - - - - - - - - - - - - - - - - - - - -
  

  
  // - - - - - - - - - - - - - - - - - - - - - - -
  
  
  // - - - - - - - - - - - - - - - - - - - - - - -

});