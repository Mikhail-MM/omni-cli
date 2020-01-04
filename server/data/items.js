const drinkSizeOptions = optionsConfig[0];

const physicalItems = [
  {
    name: 'Americano',
    price: 2.50,
    options: drinkSizeOptions,
    img: 'url'
  },
  {
    name: 'Capuccino',
    price: 3.39,
    img: 'url'
  },
]

const optionsConfig = [
  {
    id: 'oc1',
    title: 'Brewed Size Mods',
    config: {
      component: 'ButtonInputArray',
      multipleOptionsAllowed: false,
    },
    variants: [
      {
        optName: 'small',
        adjustPrice: 0,
      },
      {
        optName: 'medium',
        adjustPrice: 0.5,
      },
      {
        optTitle: 'large',
        adjustPrice: 1.00,
      },
    ],
  },
  {
    id: 'oc2',
    title: 'Special Coffee Drink Size Mods',
    config: {
      component: 'ButtonInputArray',
      multipleOptionsAllowed: false,
    },
    variants: [
      {
        optName: 'small',
        adjustPrice: 0,
      },
      {
        optName: 'medium',
        adjustPrice: 0.79,
      },
      {
        optTitle: 'large',
        adjustPrice: 1.23,
      },
    ],
  }
];


/*
Categories:
Coffee
    Capuccino
    Mocha
    Espresso
    Matcha
Tea
    Matcha Lattee

Smoothies/Juices
    Pineapple/Coconut
    Mango
    Strawberry Banana
    Green Cleanse
Boba Milk Tea

Pastry
    Cupcakes
    Brownies
    Blondies
    Cookies
    Mandolines
    Banana Bread
    Coffee Cupcake
    Churros
Sandwich
    Egg
    Egg & Cheese
    Bacon Egg & Cheese
    Tomato Spanish Toast
    Bruschetta

Merchandise

    Clothing
        Coffee Lover Shirts

    Coffee Makers
        French Press
        MR.Coffee Dripper
        Espresso Makers

    Etc
        Thermos
        Coffee Mugs
        Music - Deal of the Week




Strudel
By che - Own work, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=428026

*/