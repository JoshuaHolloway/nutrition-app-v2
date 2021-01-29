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
    
    dropdown_button_HTML_elem_parent.innerHTML = 
      `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${row_num}">
        ${food_name}
      </button>`;
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

const add_food_to_known_foods = () => {

};