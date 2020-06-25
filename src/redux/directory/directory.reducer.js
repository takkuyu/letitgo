const INITIAL_STATE = {
  categories: [
    {
      category: 'Women',
      heading:'Deals for her',
      id: 1,
      linkUrl: 'shop/women'
    },
    {
      category: 'Men',
      heading:'Deals for him',
      id: 2,
      linkUrl: 'shop/men'
    },
    {
      category: 'Electrics',
      heading:'Deals for the tech obsessed',
      id: 3,
      linkUrl: 'shop/electrics'
    },
    {
      category: 'Vehicles',
      heading:'Deals for drivers',
      id: 4,
      linkUrl: 'shop/vehicles'
    },
    {
      category: 'Home',
      heading:'Furniture & Kitchen',
      id: 5,
      linkUrl: 'shop/home'
    },
    {
      category: 'Other',
      heading:'',
      id: 6,
      linkUrl: 'shop/other'
    },
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
