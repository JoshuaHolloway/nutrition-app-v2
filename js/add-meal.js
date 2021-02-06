const day0_addMeal_button_node = document.querySelector('#day0_add-meal_button');
day0_addMeal_button_node.addEventListener('click', () => {
  
  const newRow_node = document.createElement('div');
  newRow_node.classList.add('row');
  newRow_node.classList.add('mb-4');
  newRow_node.innerHTML = `
    <div class="card bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title">Meal 1</h5>
        <h6 class="card-subtitle mb-2 text-muted">6am</h6>

          <table id="day0-table0" class="day0-tables table table-dark table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Food</th>
                <th scope="col">Servings</th>
                <th scope="col">Protein</th>
                <th scope="col">Carbs</th>
                <th scope="col">Fat</th>
                <th scope="col">Calories</th>
              </tr>
            </thead>
            <tbody id="tbody-day0-meal0">

              <tr class="day0-totals-rows">
                <th scope="row">
                  <button type="button" class="btn  button-dark" data-bs-toggle="modal" data-bs-target="#modal-day0-totals">
                    Meal Totals
                  </button>
                </th>
                <td></td>
                <td id="day0-meal0-totals-protein" class="day0-totals-protein"></td>
                <td id="day0-meal0-totals-carbs"   class="day0-totals-carbs"></td>
                <td id="day0-meal0-totals-fat"     class="day0-totals-fat"></td>
                <td id="day0-meal0-totals-cals"    class="day0-totals-cals"></td>
              </tr>

            </tbody>
          </table>

          <!-- Add Food Button -->
          <button id="add-food-button-day0-meal0" type="button" class="btn btn-secondary add-food-button-day0">
            Add Food
          </button>

      </div>
    </div>
  `;

  // const day0_container_node = document.querySelector('#day0_container');
  // const day0_daySummaryRow_div_node = document.querySelector('#day0_day-summary-row_div');
  // debugger;
  // day0_container_node.insertBefore(day0_daySummaryRow_div_node , newRow_node);
  // const children = day0_container_node.childNodes;
  // console.log(children);
  const day0_meals_div = document.querySelector('#day0_meals_div');
  day0_meals_div.append(newRow_node);

  // -(re)-append listeners to all add-food buttons
  // -TODO: Just add a new listener to the newly created button
  add_listeners_to_all_add_food_buttons_for_day();

  // -Create meal in DB:
  week0_db.collection('day0-collection').add({
    id: meal__num++,
    total_meal_cals: 0,
    foods: {}
  });
});