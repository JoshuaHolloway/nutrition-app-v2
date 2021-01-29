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

  li.addEventListener('click', () => {
    console.log(`${innerText} clicked`);
    
    // Add food data to foods object
    const food_name = innerText;
    const food_data_obj = known_foods[food_name];
    foods[food_name] = food_data_obj;
    foods[food_name].servings = 0;
    
    dropdown_button_HTML_elem_parent.innerHTML = 
      `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${row_num}">
        ${food_name}
      </button>`;


    // Create corresponding modal and append to body
    generate_modal(row_num, food_data_obj);








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
          <h5 class="modal-title" id="exampleModalLabel">Apple</h5>
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
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Total Carbs
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Fiber
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Insoluble Fiber
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Soluble Fiber
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Sugars
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Carbs
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Total Fat
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Polyunsaturated Fat
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Monounsaturated Fat
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin A
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin B6
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin B12
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin C
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin D
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin E
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Vitamin K
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Biotin
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Calcium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Chloride
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Choline
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Chromium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Copper
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <tr>
                <th scope="row">
                  Folate/Folic Acid
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <tr>
                <th scope="row">
                  Iodine
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              
              <!-- Magnesium	400mg	420mg -->
              <tr>
                <th scope="row">
                  Magnesium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Manganese	2.3mg -->
              <tr>
                <th scope="row">
                  Manganese
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Molybdenum	45mcg -->
              <tr>
                <th scope="row">
                  Molybdenum
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Niacin	16mg NE (1) -->
              <tr>
                <th scope="row">
                  Niacin
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>
              
              <!-- Pantothenic Acid	5mg -->
              <tr>
                <th scope="row">
                  Pantothenic
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Phosphorus	1250mg -->
              <tr>
                <th scope="row">
                  Phosphorus
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              
              <!-- Potassium	4700mg -->
              <tr>
                <th scope="row">
                  Potassium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Riboflavin	1.3mg -->
              <tr>
                <th scope="row">
                  Riboflavin
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Selenium	55mcg -->
              <tr>
                <th scope="row">
                  Selenium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Sodium	2300mg -->
              <tr>
                <th scope="row">
                  Sodium
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>

              <!-- Thiamin	1.2mg -->
              <tr>
                <th scope="row">
                  Thiamin
                </th>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>50%</td>
              </tr>


              <!-- Zinc	11mg -->
              <tr>
                <th scope="row">
                  Zinc
                </th>
                <td>1</td>
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