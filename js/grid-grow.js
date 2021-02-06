

// ==============================================

// // 
// const day0_table0_node = document.querySelector('#day0-table0');
// const day0_table1_node = document.querySelector('#day0-table1');

// -Instead of this, add class .day0-tables to table
// -Then, use querySelectorAll to grab a nodelist of day0_tables.
// -The, inside the add_food_buttons_day0 loop, inside each add_food_button_day0 event listener,
//  do the following node grab:
//    --Change FROM this:
//    const table0_body_node = day0_table0_node.querySelector('tbody');
//    --To THIS:
//    const table0_body_node = day0_table_nodes[meal_num].querySelector('tbody');

// 
// const table0_body_node = day0_table0_node.querySelector('tbody');
// const table1_body_node = day0_table1_node.querySelector('tbody');



// ==============================================

// Listener for 'Add Food' button to add new row to table
// -Execute this every time there is a new meal added
const add_listeners_to_all_add_food_buttons_for_day = () =>{
  console.log('adding listeners to add-food buttons');
  
  const day0_table_nodes = document.querySelectorAll('.day0-tables');
  const add_food_buttons_day0 = document.querySelectorAll('.add-food-button-day0');
  add_food_buttons_day0.forEach((add_food_button_day0, meal_num) => {
    
    add_food_button_day0.addEventListener('click', () => {
  
      console.log('add food button pressed');
      
      num_rows++;
      const row_num = num_rows - 1; // 0-based indexing
       
      // - - - - - - - - - - - - - - - - - - - - - - -
    
      // Grab known foods not already in table
      const {known_food_names_not_in_table}  = known_foods_not_in_table(meal_num);
    
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
      
      // Add new row to table
      //const totals_row_node = qs('#totals-row');
      const totals_row_nodes = qs('.day0-totals-rows');
      // Three totals rows:
      //  1. Meal 1 (class="day0-totals-rows")
      //  2. Meal 2 (class="day0-totals-rows")
      //  3. id="day0-totals-row-summary"
  
      // Append new row to table corresponding to table for current meal (append above meal-totals row)
      const table_body_node = day0_table_nodes[meal_num].querySelector('tbody');
      table_body_node.insertBefore(new_row_node, totals_row_nodes[meal_num]);
    
      // Set inner text in drop down:
      // -id=food# based on row-num
      known_food_names_not_in_table.forEach((food_name,idx) => {
  
        // Add each known food not already in table as a drop down option
        append_li(meal_num, row_num, `dropdown_option_${idx}`, food_name);
      });
    
      // - - - - - - - - - - - - - - - - - - - - - - -
      
    
      
      // - - - - - - - - - - - - - - - - - - - - - - -
      
      
      // - - - - - - - - - - - - - - - - - - - - - - -
    
    });
  
  });
};