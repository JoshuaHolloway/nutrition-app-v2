let num_rows = 0;

// ==============================================

// const grid = document.querySelector('.grid-container');
const main_table_node = document.querySelector('#main-table');
const main_table_body_node = main_table_node.querySelector('tbody');
const add_food_button = document.querySelector('#add-food-button');

// ==============================================

// Listener for 'Add Food' button to add new row to table
add_food_button.addEventListener('click', () => {
  
  num_rows++;
  const row_num = num_rows - 1; // 0-based indexing
   
  // - - - - - - - - - - - - - - - - - - - - - - -

  // Grab known foods not already in table
  const {known_food_names_not_in_table}  = known_foods_not_in_table();

  // - - - - - - - - - - - - - - - - - - - - - - -
  
  // Change HTML 
  const new_row_node = document.createElement('tr');   // table-row
  //const new_cell = document.createElement('td');  // table-data-cell
  new_row_node.innerHTML = 
    `<th scope="row">
      <div class="dropdown">
        <button id="dropdown-button_food${row_num}" class="btn btn-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown" aria-expanded="false">
          <span id="food${row_num}_dropdown_button_text">Choose Food</span>
        </button>
        <ul id="food${row_num}_dropdown" class="dropdown-menu">
        </ul>
      </div>
    </th>

    <td>
      <input type="number" class="form-control" id="serving-input-${row_num}" style="width: 100%;">
    </td>

    <td id="food${row_num}-protein">0</td>
    <td id="food${row_num}-carbs">0</td>
    <td id="food${row_num}-fat">0</td>
    <td id="food${row_num}-cals">0</td>
    `;

  // RIGHT HERE (mon)
  // -This new row has a button with id food-btn-1
  // -Target this to change the innerText of the button after the drop down menu is selected.
  // -Grab known foods (not already in table - write function for this) and use these to loop and dynamically add the li's inside the ul in the `` above.
  // -Place event listeners on these li-components, and update the button#food-1-btn innerText with the food name clicked.
  // -Update the other columns with the corresponding food's data.
  // -
  
  // Add new row to table
  const totals_row_node = qs('#totals-row');
  // main_table_body_node.append(new_row);
  main_table_body_node.insertBefore(new_row_node, totals_row_node);

  // Set inner text in drop down:
  // -id=food# based on row-num
  known_food_names_not_in_table.forEach((food_name,idx) => {
    append_li(row_num, `dropdown_option_${idx}`, food_name);
  });

  // - - - - - - - - - - - - - - - - - - - - - - -
  

  
  // - - - - - - - - - - - - - - - - - - - - - - -
  
  
  // - - - - - - - - - - - - - - - - - - - - - - -

});