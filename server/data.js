
const startingLocations = [ 
  {city: 'Montreal', coords: [45.50, -73.60]},
  {city: 'Adelaide', coords: [-34.93, 138.60]},
  {city: 'Norwich', coords: [52.63, 1.30]},
  {city: 'Houston', coords: [29.76, -95.37]},
  {city: 'Singapore', coords: [1.35, 103.82]},
  {city: 'Istanbul', coords: [41.01, 28.98]},
  {city: 'Fez', coords: [34.02, -5.01]},
  {city: 'Kyoto', coords: [35.01, 135.76]},
  {city: 'Wellington', coords: [-41.28, 174.77]},
  {city: 'Bogota', coords: [4.71, -74.07]},
  {city: 'Jerusalem', coords: [31.77, 35.21]},
];

const startingSets = [
  { 'Montreal' : {
    setId: 's1',
    itemIds : [01, 02, 03],
  }},
  { 'Adelaide' : {
    setId: 's2',
    itemIds : [04, 05, 06],
  }},
  { 'Houston' : {
    setId: 's3',
    itemIds : [07, 08, 09],
  }},
]


const trinkets = [
  {
    itemId: 01,
    name: 'Montreal Bagel', 
    coords: [45.50, -73.60],
    description: 'One of Montreal\'s local treats, a Mtl-style wood-oven baked bagel!',
    icon: 'image',
    origin: 'Montreal',
    set: {
      name: 'Montreal Start',
      itemNum: 1,
      itemSum: 3,
    },
  },
  {
    itemId: 02,
    name: 'Road Cone', 
    coords: [45.50, -73.60],
    description: 'Renowned for it\'s short road maintenance season, these become a prolific street feature in the summer',
    icon: 'image',
    origin: 'Montreal',
    set: {
      name: 'Montreal Start',
      itemNum: 2,
      itemSum: 3,
    },
  },
  {
    itemId: 03,
    name: 'Festival Tickets', 
    coords: [45.50, -73.60],
    description: 'Rire out loud, relax to some jazz or catch some F1 racing! Montreal is a hotbed for international festivals of all sorts!',
    icon: 'image',
    origin: 'Montreal',
    set: {
      name: 'Montreal Start',
      itemNum: 3,
      itemSum: 3,
    },
  },
  {
    itemId: 04,
    name: 'Pie-Floater', 
    coords: [-34.93, 138.60],
    description: 'A unique local flavour: A meat pie floating in pea soup...don\'t knock it till you try it!',
    icon: 'image',
    origin: 'Adelaide',
    set: {
      name: 'Adelaide Start',
      itemNum: 1,
      itemSum: 3,
    },
  },
  {
    itemId: 05,
    name: 'Iced Coffee', 
    coords: [-34.93, 138.60],
    description: 'Possibly the most popular drink in South Australia, Farmers Union Iced Coffee is surprisingly refreshing on a hot day.',
    icon: 'image',
    origin: 'Adelaide',
    set: {
      name: 'Adelaide Start',
      itemNum: 2,
      itemSum: 3,
    },
  },
  {
    itemId: 06,
    name: 'Chicken Parmy', 
    coords: [-34.93, 138.60],
    description: 'Common as burgers at any pub, this schnitzel parmigiana is topped with cheese and tomato and sometimes ham.',
    icon: 'image',
    origin: 'Adelaide',
    set: {
      name: 'Adelaide Start',
      itemNum: 3,
      itemSum: 3,
    },
  },
  {
    itemId: 07,
    name: 'All the BBQ', 
    coords: [52.63, 1.30],
    description: 'All of it. Just keep it coming.',
    icon: 'image',
    origin: 'Houston',
    set: {
      name: 'Houston Start',
      itemNum: 1,
      itemSum: 3,
    },
  },
  {
    itemId: 08,
    name: 'Sweet Tea', 
    coords: [52.63, 1.30],
    description: 'A favourite in the southern USA, whose name says it all. Perfect to accompany some BBQ.',
    icon: 'image',
    origin: 'Houston',
    set: {
      name: 'Houston Start',
      itemNum: 2,
      itemSum: 3,
    },
  },
  {
    itemId: 09,
    name: '', 
    coords: [52.63, 1.30],
    description: '',
    icon: 'image',
    origin: 'Houston',
    set: {
      name: 'Houston Start',
      itemNum: 3,
      itemSum: 3,
    },
  },
];

module.exports = { startingLocations, trinkets, startingSets };
