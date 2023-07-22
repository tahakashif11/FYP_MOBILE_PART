export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};

export const Items = [
  {
    id: 1,
    category: 'product',
    productName: 'Basic Equipment 1',
    productPrice: 1799,
    description:
      'Basic Equipment for pushups',
    isOff: false,
    offPercentage: 5,
    productImage: require('../database/images/products/cali_eqipu.jpg'),
    isAvailable: true,
   
  },
  {
    id: 2,
    category: 'product',
    productName: 'Basic Equipment 2',
    productPrice: 1499,
    description:
      'Basics',
    isOff: false,
    productImage: require('../database/images/products/dip.png'),
    isAvailable: true,
    
  },
  {
    id: 3,
    category: 'accessory',
    productName: 'Ropes',
    productPrice: 1999,
    description:
      'Rope for exercise',
    isOff: true,
    offPercentage: 18,
    productImage: require('../database/images/accessories/rope.jpg'),
    isAvailable: true,
    
  },
  {
    id: 4,
    category: 'accessory',
    productName: 'Ear Phones',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
    isOff: false,
    productImage: require('../database/images/accessories/boatbassheads1.png'),
    isAvailable: true,
    
  },  
];
