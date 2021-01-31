// ===========================================================

const protein_grams_per_serving_banana = 1.3;
const fat_grams_per_serving_banana = 0.4;
const carb_grams_per_serving_banana = 27;
const known_foods = {
  // -All keys list the macro/micro nutrient name
  // -All values list the grams per serving
  // -Serving size lists units in key-name
  'banana': {
    name: 'banana',
    nutrition_facts: {
      protein: 1.3,
      fat: {
        total: 0.4,
        saturated: 11,
        mono: 22,
        poly: 33,
        trans: 44
      },
      carbs: {
        total: 27,
        fiber: {
          total: 000,
          insoluble: 111,
          soluble: 222
        },
        sugars: {
          total: 333,
          added: 444
        }
      },
      micro: {
        vitamins: {
          A: 555,
          B6: 666,
          biotin: 777,
          B12: 888,
          C: 999,
          D: 0000,
          E: 1111,
          K: 2222,
        },
        minerals: {
          calcium: 3333,
          chloride: 4444,
          choline: 5555,
          chromium: 6666,
          copper: 7777,
          folate: 8888,
          iodine: 9999,
          phosphorus: 000000,
          potassium: 111111,
          sodium: 222222,
          magnesium: 333333,
          manganese: 444444,
          molybdenum: 555555,
          niacin: 666666,
          pantothenic: 777777,
          riboflavin: 888888,
          selenium: 999999,
          thiamin: 00000000,
          zinc: 11111111
        }
      }
    }, 
  },
  'orange': {
    name: 'orange',
    nutrition_facts: {
      protein: 0.9,
      fat: {
        total: 0.1,
        saturated: 0,
        mono: 0,
        poly: 0,
        trans: -1
      },
      carbs: {
        total: 11,
        fiber: {
          total: 000,
          insoluble: 111,
          soluble: 222
        },
        sugars: {
          total: 333,
          added: 444
        }
      },
      micro: {
        vitamins: {
          A: 555,
          B6: 666,
          biotin: 777,
          B12: 888,
          C: 999,
          D: 0000,
          E: 1111,
          K: 2222,
        },
        minerals: {
          calcium: 3333,
          chloride: 4444,
          choline: 5555,
          chromium: 6666,
          copper: 7777,
          folate: 8888,
          iodine: 9999,
          phosphorus: 000000,
          potassium: 111111,
          sodium: 222222,
          magnesium: 333333,
          manganese: 444444,
          molybdenum: 555555,
          niacin: 666666,
          pantothenic: 777777,
          riboflavin: 888888,
          selenium: 999999,
          thiamin: 00000000,
          zinc: 11111111
        }
      }
    }, 
  }
};

// ===========================================================