// const days = [
//   meals[0],
//   meals[1]
// ];

const meals = [{
    foods: {},
    total_protein: 0,
    total_fat: 0,
    total_carbs: 0,
    total_cals: 0, 
    goal_protein: 0,
    goal_cals: 0
  },
  {
    foods: {},
    total_protein: 0,
    total_fat: 0,
    total_carbs: 0,
    total_cals: 0, 
    goal_protein: 0,
    goal_cals: 0
  },
];


// Fake DB:
// meals[meal_num].total_cals = 0;
// meals[meal_num].foods[food_name] = {servings: 0};

// Actual DB:


// Create DB:
let week0_db = null;
const create_db_button = document.querySelector('#create-db');
create_db_button.addEventListener('click', () => {

  week0_db = new Localbase('week0-db');
  
  // Create meal:
  let meal__num = 0;
  week0_db.collection('day0-collection').add({
    id: meal__num++,
    total_meal_cals: 0,
    foods: {}
  });
});

const delete_db_button = document.querySelector('#delete-db');
delete_db_button.addEventListener('click', () => {
  console.log('deleting database');
  week0_db.delete();
});