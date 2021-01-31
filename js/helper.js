const qs = (target) => document.querySelector(target);

// ========================================================

const set_inner_text = (target, innerText) => {
  const elem = qs(target);
  elem.innerText = innerText;
};

// ========================================================

const append_li = (row_num, a_class_name, innerText) => {

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
    //foods[food_name] = food_data_obj;
    foods[food_name] = {
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

      console.log('row-num: ', row_num);
      console.log('food_name: ', food_name);

      // Update servings in foods object with 
      const servings = row_input_field.value
      foods[food_name].servings = servings;

      const protein = servings * known_foods[food_name].nutrition_facts.protein;
      foods[food_name].protein = protein;

      const carbs = servings * known_foods[food_name].nutrition_facts.carbs.total;
      foods[food_name].carbs = carbs;

      const fat = servings * known_foods[food_name].nutrition_facts.fat.total;
      foods[food_name].fat = fat;


      const cals = fat * 9 + carbs * 4 + protein * 4;
      foods[food_name].cals = cals;
      
      // Update data in table:
      //<td id="food${row_num}-protein">0</td>
      const td_protein = qs(`#food${row_num}-protein`);
      td_protein.innerText = protein.toFixed(1);

      const td_carbs = qs(`#food${row_num}-carbs`);
      td_carbs.innerText = carbs.toFixed(1);

      const td_fat = qs(`#food${row_num}-fat`);
      td_fat.innerText = fat.toFixed(1);

      const td_cals = qs(`#food${row_num}-cals`);
      td_cals.innerText = cals.toFixed(1);

    });
  });
};

// ========================================================

const known_foods_not_in_table = () => {

  const known_foods_keys = Object.keys(known_foods);
  const foods_keys = Object.keys(foods);

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