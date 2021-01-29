const calc_button = document.querySelector('.calc-button');
const input_fields = document.querySelectorAll('.serving-input');

const get_field_val = (input_field) => Number(input_field.value);

// ===========================================================

const compute_cals = (protein, fat=0, carbs=0) => {
  // input units: grams

  const cals_from_fat = 9 * fat;
  const cals_from_carbs = 4 * carbs;
  const cals_from_protein = 4 * protein;

  return cals_from_fat + cals_from_carbs + cals_from_protein;
};

// ===========================================================