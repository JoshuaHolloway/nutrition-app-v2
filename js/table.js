  // program globals
  let meal__num = 0;
  let num_rows = 0; // TODO: Change to be unique to each table

// const days = [
//   meals[0],
//   meals[1]
// ];

const meals = [
  {
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
let week0_db = new Localbase('week0-db');

week0_db.collection('exists').doc({ id: 0 }).get().then(doc => {
  // -Fire .doc() method with obj as arg with selection criteria.
  // -Trigger .get() method, which returns a promise with the document.
  console.log(doc);

  console.log('results: ', doc);

  // -If document.exists === true, then grab the number of rows in the table
  //  and the corresponding data for each row and render the HTML
  if (doc === undefined) {
    console.log('TODO: Create the database');

    week0_db.collection('exists').add({
      id: 0,
      exists: true
    });
  } else {
    console.log('TODO: Render the HTML');

    // Step 1: Get the document for meal0 from db
    // Step 2: Grab the keys from document.foods:
    //        const keys = Object.keys(document.foods);
    // Step 3: Loop over the keys to generate the rows in the table

    week0_db.collection('day0-collection').doc({ id: 0 }).get().then(doc_ => {
      // -Fire .doc() method with obj as arg with selection criteria.
      // -Trigger .get() method, which returns a promise with the document.
      console.log('doc_: ', doc_);

      // debugger;
      const keys = Object.keys(doc_.foods);
      console.log('keys: ', keys);
    })
  }
});

// ===========================================================

const create_db_button = document.querySelector('#create-db');
create_db_button.addEventListener('click', () => {

  // Set exists collection with a document to test to see if db exists:
  week0_db.collection('exists').add({
    id: 0,
    exists: true
  });
});

const delete_db_button = document.querySelector('#delete-db');
delete_db_button.addEventListener('click', () => {
  console.log('deleting database');
  week0_db.delete();
});