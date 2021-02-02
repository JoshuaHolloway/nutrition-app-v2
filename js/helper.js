const qs = (target) => document.querySelector(target);

// ========================================================

const set_inner_text = (target, innerText) => {
  const elem = qs(target);
  elem.innerText = innerText;
};

// ========================================================

const append_li = (meal_num, row_num, a_class_name, innerText) => {

  const ul = qs(`#food${row_num}_dropdown`);
  const li = document.createElement('li');

  li.innerHTML = `<span class="${a_class_name} dropdown-item" >${innerText}</span>`;
  ul.append(li);

  // food${row_num}_dropdown_button_text
  const dropdown_button_HTML_elem_parent = qs(`#dropdown-button_food${row_num}`).parentElement;

  // -When new food is chosen from dropdown menu, do the following:
  li.addEventListener('click', () => {

    console.log(`${innerText} clicked`);
    
    // Add food data to foods object
    const food_name = innerText;

    // Create structure of property for this food here:
    const food_data_obj = known_foods[food_name];
    //table[food_name] = food_data_obj;
    meals[meal_num].foods[food_name] = {
      servings: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    
    dropdown_button_HTML_elem_parent.innerHTML = 
      `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${row_num}">
        ${food_name}
      </button>`;

    // Create corresponding modal and append to body
    generate_modal(row_num, food_data_obj);

    // Add event listener to input field
    // <input type="number" class="form-control" id="serving-input-${row_num}" style="width: 100%;">
    const row_input_field = qs(`#serving-input-${row_num}`);
    row_input_field.addEventListener('change', () => {

      console.log('servings input field changed');

      const servings = row_input_field.value
      if (row_input_field.value >= 0) {

        // Update servings in table object with 
        meals[meal_num].foods[food_name].servings = servings;

        const protein = servings * known_foods[food_name].nutrition_facts.protein;
        meals[meal_num].foods[food_name].protein = protein;

        const carbs = servings * known_foods[food_name].nutrition_facts.carbs.total;
        meals[meal_num].foods[food_name].carbs = carbs;

        const fat = servings * known_foods[food_name].nutrition_facts.fat.total;
        meals[meal_num].foods[food_name].fat = fat;

        const cals = fat * 9 + carbs * 4 + protein * 4;
        meals[meal_num].foods[food_name].cals = cals;

        // Update totals:
  
        let total_protein = 0;
        let total_fat = 0;
        let total_carbs = 0;
        let total_cals = 0;

        const food_names_in_current_meal = Object.keys(meals[meal_num].foods);
        food_names_in_current_meal.forEach((food_key) => {
          total_protein += meals[meal_num].foods[food_key].protein;
          total_fat += meals[meal_num].foods[food_key].fat;
          total_carbs += meals[meal_num].foods[food_key].carbs;
          total_cals += meals[meal_num].foods[food_key].cals;
        });

        // Grab values of goals:
        const goal_protein = qs('#goals-input-field-protein').value;
        const goal_cals = qs('#goals-input-field-cals').value;

        // Store values in foods object for table in order to use later
        meals[meal_num]['total_protein'] = total_protein;
        meals[meal_num]['total_fat'] = total_fat;
        meals[meal_num]['total_carbs'] = total_carbs;
        meals[meal_num]['total_cals'] = total_cals; 
        meals[meal_num]['goal_protein'] = goal_protein;
        meals[meal_num]['goal_cals'] = goal_cals;

        // -Update event listeners for goal row to incorporate new data
        // -I think if I had a method inside the foods object to recompute the totals then I could call it here
        //  and then set the listeners for the goal fields only once and in the following function I simply 
        //  invoke those re-computation of totals methods in the event listeners for the change event on the
        //  fields for the goals
        overwrite_event_listeners_for_goal_fields(meal_num);
        // debugger;
        
        // Compute %-met:
        const percent_met_protein = (total_protein / goal_protein) * 100;
        const percent_met_cals = (total_cals / goal_cals) * 100;

        const update_td = (target, nutrient_val) => {
          const td = qs(target);
          td.innerText = nutrient_val.toFixed(1);
        };

        // Update data in current row:
        //<td id="food${row_num}-protein">0</td>
        update_td(`#food${row_num}-protein`, protein);
        // update_td(`#food${row_num}-carbs`, carbs);
        // update_td(`#food${row_num}-fat`, fat);
        // update_td(`#food${row_num}-cals`, cals);
        // update_td('#totals-protein', total_protein);
       

        // update_td('#totals-fat', total_fat);
        // update_td('#totals-carbs', total_carbs);
        // update_td('#totals-cals', total_cals);
        //qs('#percent-met-protein').innerText = `${percent_met_protein.toFixed(1)}%`;
        //qs('#percent-met-cals').innerText = `${percent_met_cals.toFixed(1)}%`;
        // -This currently only updates the meal totals from the first table.
        // -To target the current meal's row, just change the id to a class and then
        //  do a qsAll and then do the result node[meal_num].innerText

        // <td id="day0-meal0-totals-protein" class="day0-totals-protein"></td>
        // <td id="day0-meal0-totals-carbs"   class="day0-totals-carbs"></td>
        // <td id="day0-meal0-totals-fat"     class="day0-totals-fat"></td>
        // <td id="day0-meal0-totals-cals"    class="day0-totals-cals"></td>
        const total_protein_for_day_meals_nodes = document.querySelectorAll('.day0-totals-protein');
        total_protein_for_day_meals_nodes[meal_num].innerText = total_protein;



        // TODO: Compute totals for overall day:
        //const day_summary_totals_protein = document.querySelectorAll('.day0-totals-protein')[meals.length]; // meals.length is one less than number of tables
        const day_summary_total_protein = document.querySelector('#day0-summary-totals-protein');
                        // <td id="day0-meal0-totals-protein" class="day0-totals-protein"></td>
                        // <td id="day0-meal0-totals-carbs"   class="day0-totals-carbs"></td>
                        // <td id="day0-meal0-totals-fat"     class="day0-totals-fat"></td>
                        // <td id="day0-meal0-totals-cals"    class="day0-totals-cals"></td>

        // TODO: Loop over all totals:
        let day_total_protein = 0;
        meals.forEach((meal, meal_idx) => {
          day_total_protein += meal.total_protein;
        });
        day_summary_total_protein.innerText = day_total_protein;


      } else { row_input_field.value = 0; }// if (serving >= 0)
      
    });
  });
};

// ========================================================

const overwrite_event_listeners_for_goal_fields = (meal_num) => {
  const goal_input_field_protein = qs('#goals-input-field-protein');
  const goal_input_field_cals = qs('#goals-input-field-cals');

  goal_input_field_protein.addEventListener('change', () => {

    // Grab new value of goal:
    const goal_protein = goal_input_field_protein.value;
    meals[meal_num].goal_protein = goal_protein; // update goal_protein globally


    console.log('changed protein goal');
    console.log('meals[meal_num]foods.goal_protein: ', meals[meal_num].goal_protein);

    // Compute %-met:
    const percent_met_protein = (meals[meal_num].total_protein / goal_protein) * 100;

    // Update %-met row:
    qs('#percent-met-protein').innerText = `${percent_met_protein.toFixed(1)}%`;

  });

  goal_input_field_cals.addEventListener('change', () => {
    // Grab new value of goal:
    const goal_cals = goal_input_field_cals.value;
    meals[meal_num].goal_cals = goal_cals; // update goal_cals globally

    // Compute %-met:
    const percent_met_cals = (meals[meal_num].total_cals / goal_cals) * 100;

    // Update %-met row:
    qs('#percent-met-cals').innerText = `${percent_met_cals.toFixed(1)}%`
  });
};

// ========================================================

const known_foods_not_in_table = (table_idx) => {

  const known_foods_keys = Object.keys(known_foods);
  const foods_keys = Object.keys(meals[table_idx].foods);

  //const known_foods_not_in_table_obj = {};
  //const known_foods_not_in_table_arr = [];

  // https://stackoverflow.com/a/33034768
  // const arr1 = [1,2,3];
  // const arr2 = [2,3];
  // const a = arr2.includes(1);
  // const b = arr2.includes(2);
  // const c = arr2.includes(3);

  // -Return the current element of arr1 
  //  if arr2 doesn't include it.
  //let difference = arr1.filter(x => !arr2.includes(x));
  const difference = known_foods_keys.filter(x => !foods_keys.includes(x));
  return {known_food_names_not_in_table: difference};
};

// ========================================================

const generate_modal = (row_num, food_obj) => {

  const div = document.createElement('div');
  const body = qs('body');
  body.append(div);

  const modal_HTML = 
  `<div class="modal fade" id="modal-${row_num}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${food_obj.name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <table class="table table-dark table-hover table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Per Serving</th>
                <th scope="col">Consumed</th>
                <th scope="col">Goal</th>
                <th scope="col">% Achieved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  Protein
                </th>
                <td>${food_obj.nutrition_facts.protein}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Total Carbs
                </th>
                <td>${food_obj.nutrition_facts.carbs.total}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Fiber
                </th>
                <td>${food_obj.nutrition_facts.carbs.fiber.total}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Insoluble Fiber
                </th>
                <td>${food_obj.nutrition_facts.carbs.fiber.insoluble}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Soluble Fiber
                </th>
                <td>${food_obj.nutrition_facts.carbs.fiber.soluble}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Sugars
                </th>
                <td>${food_obj.nutrition_facts.carbs.sugars.total}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Added
                </th>
                <td>${food_obj.nutrition_facts.carbs.sugars.added}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Total Fat
                </th>
                <td>${food_obj.nutrition_facts.fat.total}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Polyunsaturated Fat
                </th>
                <td>${food_obj.nutrition_facts.fat.poly}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Monounsaturated Fat
                </th>
                <td>${food_obj.nutrition_facts.fat.mono}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin A
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.A}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
              <th scope="row">
              Vitamin B6
              </th>
              <td>${food_obj.nutrition_facts.micro.vitamins.B6}</td>
              <td>1</td>
              <td>2</td>
              <td>50%</td>
              </tr>
              
              <tr>
                <th scope="row">
                  Biotin
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.biotin}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin B12
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.B12}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin C
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.C}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin D
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.D}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin E
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.E}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin K
                </th>
                <td>${food_obj.nutrition_facts.micro.vitamins.K}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>


              <tr>
                <th scope="row">
                  Calcium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.calcium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Chloride
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.chloride}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Choline
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.choline}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Chromium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.chromium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Copper
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.copper}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Folate/Folic Acid
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.folate}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <tr>
                <th scope="row">
                  Iodine
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.iodine}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              
              <!-- Magnesium	400mg	420mg -->
              <tr>
                <th scope="row">
                  Magnesium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.magnesium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Manganese	2.3mg -->
              <tr>
                <th scope="row">
                  Manganese
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.manganese}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Molybdenum	45mcg -->
              <tr>
                <th scope="row">
                  Molybdenum
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.molybdenum}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Niacin	16mg NE (1) -->
              <tr>
                <th scope="row">
                  Niacin
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.niacin}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Pantothenic Acid	5mg -->
              <tr>
                <th scope="row">
                  Pantothenic
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.pantothenic}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Phosphorus	1250mg -->
              <tr>
                <th scope="row">
                  Phosphorus
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.phosphorus}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              
              <!-- Potassium	4700mg -->
              <tr>
                <th scope="row">
                  Potassium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.potassium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Riboflavin	1.3mg -->
              <tr>
                <th scope="row">
                  Riboflavin
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.riboflavin}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Selenium	55mcg -->
              <tr>
                <th scope="row">
                  Selenium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.selenium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Sodium	2300mg -->
              <tr>
                <th scope="row">
                  Sodium
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.sodium}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Thiamin	1.2mg -->
              <tr>
                <th scope="row">
                  Thiamin
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.thiamin}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Zinc	11mg -->
              <tr>
                <th scope="row">
                  Zinc
                </th>
                <td>${food_obj.nutrition_facts.micro.minerals.zinc}</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;

  div.innerHTML = modal_HTML;
};