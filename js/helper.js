const qs = (target) => document.querySelector(target);

// ========================================================

const set_inner_text = (target, innerText) => {
  const elem = qs(target);
  elem.innerText = innerText;
};

// ========================================================

const append_li = (ul_target, li_id_name, innerText) => {

  const ul = qs(ul_target);
  const li = document.createElement('li');
  li.innerText = innerText;
  ul.append(li);
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