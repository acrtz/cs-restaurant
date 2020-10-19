import mockRestaurantList from "./mockRestaurantList";
import { filterRestaurants, prepareFilterGroups } from './filterUtilities';

describe("filterRestaurants Fxn",()=> {
  it('correctly filters based on state, genre, attire, and textSearch', () =>{
    const filteredRestaurants = filterRestaurants(
      {
        state: ['FL', 'AZ'],
        genre: ['american'],
        attire: ['business casual']
      },
      'The Cap',
      mockRestaurantList
    )
    const mockFilteredRestaurants = [
      {
        id: "71764c4a-52fc-4565-8f5a-19fed53ef049",
        name: "The Capital Grille",
        address1: "16489 N Scottsdale Rd",
        city: "Scottsdale",
        state: "AZ",
        zip: "85254",
        lat: "33.637215",
        long: "-111.924262",
        telephone: "(480) 348-1700",
        tags:
          "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        website: "http://www.thecapitalgrille.com",
        genre: "Steak,American",
        hours:
          "Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM",
        attire: "business casual",
      },
      {
        id: "eb749df5-4b5d-4a4b-aa0b-b1fb7f53b04d",
        name: "The Capital Grille",
        address1: "9101 International Dr",
        city: "Orlando",
        state: "FL",
        zip: "32819",
        lat: "28.430828",
        long: "-81.470184",
        telephone: "(407) 370-4392",
        tags:
          "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        website: "http://www.thecapitalgrille.com",
        genre: "Steak,American",
        hours:
          "Mon-Thu 11:30 AM-10:00 PM; Fri 11:30 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-10:00 PM",
        attire: "business casual",
      }
    ]
    expect(filteredRestaurants).toEqual(mockFilteredRestaurants)
  })
});

describe('prepareFilterGroups', ()=>{
  it('extracts correct filter values and ids from restraurants ', ()=>{
    const mockFilterGroups = {
      state: [
        { id: 'AZ', name: "Arizona"},
        { id: 'CA', name: "California"},
        { id: 'CO', name: "Colorado"},
        { id: 'FL', name: "Florida"},
        { id: 'HI', name: "Hawaii"},
        { id: 'ME', name: "Maine"},
        { id: 'MD', name: "Maryland"},
        { id: 'MA', name: "Massachusetts"},
        { id: 'MN', name: "Minnesota"},
        { id: 'NV', name: "Nevada"},
        { id: 'NJ', name: "New Jersey"},
        { id: 'NY', name: "New York"},
        { id: 'NC', name: "North Carolina"},
        { id: 'OR', name: "Oregon"},
        { id: 'PA', name: "Pennsylvania"},
        { id: 'SC', name: "South Carolina"},
        { id: 'TN', name: "Tennessee"},
        { id: 'TX', name: "Texas"},
        { id: 'VA', name: "Virginia"},
        { id: 'WV', name: "West Virginia"}
      ],
      genre: [
        { id: 'american',name: 'American'},
        { id: 'asian',name: 'Asian'},
        { id: 'bakery',name: 'Bakery'},
        { id: 'belgian',name: 'Belgian'},
        { id: 'bistro',name: 'Bistro'},
        { id: 'british',name: 'British'},
        { id: 'cafe',name: 'Cafe'},
        { id: 'coffee',name: 'Coffee'},
        { id: 'contemporary',name: 'Contemporary'},
        { id: 'continental',name: 'Continental'},
        { id: 'eclectic',name: 'Eclectic'},
        { id: 'european',name: 'European'},
        { id: 'french',name: 'French'},
        { id: 'fusion',name: 'Fusion'},
        { id: 'grill',name: 'Grill'},
        { id: 'hawaiian',name: 'Hawaiian'},
        { id: 'international',name: 'International'},
        { id: 'irish',name: 'Irish'},
        { id: 'italian',name: 'Italian'},
        { id: 'japanese',name: 'Japanese'},
        { id: 'kosher',name: 'Kosher'},
        { id: 'oysters',name: 'Oysters'},
        { id: 'pacific rim',name: 'Pacific rim'},
        { id: 'pasta',name: 'Pasta'},
        { id: 'polynesian',name: 'Polynesian'},
        { id: 'sandwiches',name: 'Sandwiches'},
        { id: 'seafood',name: 'Seafood'},
        { id: 'steak',name: 'Steak'},
        { id: 'sushi',name: 'Sushi'},
        { id: 'tea',name: 'Tea'},
        { id: 'traditional',name: 'Traditional'},
        { id: 'vegetarian',name: 'Vegetarian'},
        { id: 'vietnamese', name: 'Vietnamese'}
      ],
      attire: [
        { id: 'business casual',  name:'Business casual'},
        { id: 'casual',  name:'Casual'},
        { id: 'formal',  name:'Formal'},
        { id: 'smart casual',  name:'Smart casual'}
      ]
    }
    const preparedFilter = prepareFilterGroups(mockRestaurantList);
    expect(preparedFilter).toEqual(mockFilterGroups);
  });
});


