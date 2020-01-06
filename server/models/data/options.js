const options = [
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
        adjustPrice: 0.00,
      },
      {
        optName: 'medium',
        adjustPrice: 0.50,
      },
      {
        optTitle: 'large',
        adjustPrice: 1.00,
      },
    ],
  },
  {
    id: 'oc2',
    title: 'Espresso Shot Count',
    config: {
      component: 'ButtonInputArray',
      multipleOptionsAllowed: false,
    },
    variants: [
      {
        optName: 'single',
        adjustPrice: 0.00,
      },
      {
        optName: 'double',
        adjustPrice: 1.25,
      },
      {
        optTitle: 'tripple',
        adjustPrice: 2.00,
      },
    ],
  },
  {
    id: 'oc3',
    title: 'Special Drink Sizes',
    config: {
      component: 'ButtonInputArray',
      multipleOptionsAllowed: false,
    },
    variants: [
      {
        optName: 'small',
        adjustPrice: 0.00,
      },
      {
        optName: 'medium',
        adjustPrice: 0.89
      },
      {
        optName: 'large',
        adjustPrice: 1.39,
      },
    ],
  },
];

export { options }