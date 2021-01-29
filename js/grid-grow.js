let num_rows = 1;

// ==============================================

const grid = document.querySelector('.grid-container');
const add_food_button = document.querySelector('.add-food-button');

// ==============================================

// Listener for 'Add Food' button to add new row to table
add_food_button.addEventListener('click', () => {
  
  num_rows++;
  
  // Change CSS
  grid.style.gridTemplateRows = `repeat(${num_rows}, 1fr)`;
  
  // Change HTML 
  const new_row = document.createElement('div');
  new_row.classList.add('row');
  grid.append(new_row);

  const new_elem_1 = document.createElement('div');
  new_elem_1.classList.add('table-food-name');
  new_row.append(new_elem_1);
  
  const new_elem_2 = document.createElement('div');
  new_elem_2.classList.add('table-serving');
  const new_input_field = document.createElement('input');
  new_input_field.classList.add('serving-input');
  new_input_field.type = "number";
  new_elem_2.append(new_input_field);
  new_row.append(new_elem_2);
  
  // <input class="serving-input" type="number" ></input>
  
  const keys = Object.keys(known_foods);
  // console.log('keys: ', keys);
  
  // Generate drop down:
  new_elem_1.innerHTML = 
    `<div class="drop-down-container">
    <div class="drop-down">Drop-Down</div>
      <div class="list-container show">
        <ul>
        </ul>
      </div>
    </div>`;
    
  const ul = document.querySelector('.list-container > ul');
  
  // - - - - - - - - - - - - - - - - - - - - - - -

  // -Create a drop down option for each known food
  // -Only display foods not already in table
  // console.log('foods: ', foods);
  // console.log('known_foods: ', known_foods);
  const known_foods_keys = Object.keys(known_foods);
  let foods_keys = Object.keys(foods);
  known_foods_keys.forEach((key, idx) => {
    
    if (known_foods_keys[idx] !== foods_keys[idx]) {
      const li = document.createElement('li');
      li.innerText = `${key}`;
      ul.append(li);
    }
    
  });
  const li = document.createElement('li');
  li.innerText = 'New Food';
  ul.append(li);
  
  // - - - - - - - - - - - - - - - - - - - - - - -
  
  // Drop-down listener:
  const drop_down_button = document.querySelector('.drop-down');
  drop_down_button.addEventListener('click', () => {
    const drop_down_list = document.querySelector('.list-container');
    drop_down_list.classList.toggle('show');
  });
  
  // - - - - - - - - - - - - - - - - - - - - - - -
  
  // Drop-down selection listener
  const food_options_HTML = document.querySelectorAll('.list-container > ul > li');
  food_options_HTML.forEach(food_option_HTML => {
    food_option_HTML.addEventListener('click', () => {
      // console.log('key: ', keys[idx]);
      
      // Add selected chosen food to foods array:
      const food_name = food_option_HTML.innerText;
      
      // Update foods object with food data from known foods array based on selection of new food
      foods[food_name] = {
        name: food_name,
        nutrition_facts: {},
        servings: 0
      };
      foods[food_name].nutrition_facts.protein = known_foods[food_name].protein;
      foods[food_name].nutrition_facts.carbs = known_foods[food_name].carbs;
      foods[food_name].nutrition_facts.fat = known_foods[food_name].fat;
      foods[food_name].name = food_name;
      foods[food_name].servings = 0;
      
      // -Turn off the drop down menu
      const list_container = document.querySelector('.list-container')
      list_container.classList.remove('show');
      // -Removing the 'show' class on the element causes the drop-down to be in the
      //  non-dropped-down state.
      // -We now want to actually delete the drop-down all together.
      
      // -Change HTML where the drop-down is currently:
      new_elem_1.innerHTML = ` `;
      // TODO: Change these variables to more descriptive names!!

      // -Change HTML for new row to exactly match the working rows:
      new_row.innerHTML = 
        `<div class="table-food-name">Banana:</div>
        <div class="table-food-protein"></div>
        <div class="table-food-carbs"></div>
        <div class="table-food-fat"></div>
        <div class="table-food-cals"></div>
        <div class="table-serving">
          <input class="serving-input" type="number" >
        </div>`;
      
      // Update table with foods object data
      const table_rows = document.querySelectorAll('.grid-container > .row');

      // -We update foods object.
      // -We need to grab all the keys from the update object.
      
      
      // TODO: Simplify this janky ass code!
      foods_keys = Object.keys(foods);



      // Loop over each row
      table_rows.forEach((current_row, current_row_idx) => {

        const food_key = foods_keys[current_row_idx];
        const food = foods[food_key];

        
        
        const child_nodes = current_row.childNodes;
        const child_nodes_array = Array.from(child_nodes);
        
        // Make whitespace not matter in HTML!
        const useful_nodes = Array.from(child_nodes).filter(x => x.nodeType !== 3);       
        // useful_nodes (each is a col in one row):
        // 0: Name
        // 1: protein
        // 2: Servings
        
        const current_row_servings_input_field = current_row.querySelector('.serving-input');
        current_row_servings_input_field.value = food.servings;
        
        const row_name_HTML = useful_nodes[0];
        const protein_HTML = useful_nodes[1];
        const carbs_HTML = useful_nodes[2];
        const fat_HTML = useful_nodes[3];
        row_name_HTML.innerText = food.name;
        
        // Add event listener to the input field for servings of this row
        current_row_servings_input_field.addEventListener('change', (event) => {
          console.log('changed');
          
          // Nutrition Facts:
          food.servings = Number(event.target.value);
          const servings = food.servings;

          protein_HTML.innerText = (servings * food.nutrition_facts.protein).toFixed(1);
          carbs_HTML.innerText = (servings * food.nutrition_facts.carbs).toFixed(1);
          fat_HTML.innerText = (servings * food.nutrition_facts.fat).toFixed(1);

          const cals_per_serving = compute_cals(
            food.nutrition_facts.protein,
            food.nutrition_facts.fat,
            food.nutrition_facts.carbs
          );

          // Total cals for this row
          const cals = (servings * cals_per_serving).toFixed(1);
          current_row.querySelector('.table-food-cals').innerText = cals;
        });
      });
    });
  });
  
  // - - - - - - - - - - - - - - - - - - - - - - -

});