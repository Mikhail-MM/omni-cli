import path from 'path';
import { options } from './options';

const drinkSizes = options[0];
const espressoShotCount = options[1];
const specialDrinkSizes = options[2];

const imgroot = path.resolve(__dirname, '../public/images/stock');

const hotDrinks = [
  {
    name: 'Americano',
    price: 2.50,
    options: [drinkSizes],
    img: `${imgroot}/Americano.jpg`,
    category: 'Hot Drinks',
  },
  {
    name: 'Cappuccino',
    price: 3.39,
    options: [espressoShotCount],
    imgurl: `${imgroot}/Cappuccino.jpg`,
    category: 'Hot Drinks',
  },
  {
    name: 'Latte',
    price: 2.99,
    options: [drinkSizes, espressoShotCount],
    imgurl: `${imgroot}/Latte.jpg`,
    category: 'Hot Drinks',
  },
  {
    name: 'Macchiato',
    price: 3.49,
    options: [espressoShotCount],
    imgurl: `${imgroot}/Macchiato.jpg`,
    category: 'Hot Drinks',
  },
  {
    name: 'Brewed Tea',
    price: 1.39,
    options: [drinkSizes],
    imgurl: `${imgroot}/Brewed-Tea.jpg`,
    category: 'Hot Drinks',
  },
];

const smoothies = [
  {
    name: 'Mango Smoothie',
    price: 4.00,
    options: [specialDrinkSizes],
    category: 'Smoothies',
    imgurl: `${imgroot}/Mango-Smoothie.jpg`,
  },
  {
    name: 'Strawberry-Banana Smoothie',
    price: 3.50,
    options: [specialDrinkSizes],
    category: 'Smoothies',
    imgurl: `${imgroot}/Strawberry-Banana-Smoothie.jpg`,
  },
  {
    name: 'Pineapple-Coconut Smoothie',
    price: 4.49,
    options: [specialDrinkSizes],
    category: 'Smoothies',
    imgurl: `${imgroot}/Coconut-Smoothie.jpg`,
  },
  {
    name: 'Green Cleanse Smoothie',
    price: 3.00,
    options: [specialDrinkSizes],
    category: 'Smoothies',
    imgurl: `${imgroot}/Green-Smoothie.jpg`,
  }
];

const physicalItems = [
  ...hotDrinks,
  ...smoothies
];

export { physicalItems }
