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
  const dropdown_button_food_text_HTML_elem = qs(`#food${row_num}_dropdown_button_text`);

  li.addEventListener('click', () => {
    console.log(`${innerText} clicked`);
    dropdown_button_food_text_HTML_elem.innerText = innerText;
  });
};

// ========================================================

const known_foods_not_in_table = () => {

  const known_foods_keys = Object.keys(known_foods);
  let foods_keys = Object.keys(foods);

  const known_foods_not_in_table_obj = {};
  const known_foods_not_in_table_arr = [];
  known_foods_keys.forEach((key, idx) => {     
    if (known_foods_keys[idx] !== foods_keys[idx]) {
      const food_name = known_foods_keys[idx];

      known_foods_not_in_table_obj[food_name] = foods[known_foods_keys[idx]];

      known_foods_not_in_table_arr.push(food_name);
    }
  });
  return {known_foods_not_in_table_arr, known_foods_not_in_table_obj};
};

// ========================================================

const add_event_listener = () => {

};