import {getRandomIntInclusive} from '../utils/common.js';


const offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Upgrade to a econom class',
        price: getRandomIntInclusive(100,200)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Upgrade to a komfort class',
        price: getRandomIntInclusive(100,200)
      },
    ]
  },

  {
    type: 'bus',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa34',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa35',
        title: 'Upgrade',
        price: getRandomIntInclusive(100,200)
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa37',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      }
    ]
  },

  {
    type: 'flight',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa38',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa39',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
    ]
  },

  {
    type: 'ship',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa40',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      }]
  },

  {
    type: 'drive',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa41',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa42',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa43',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      }]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa44',
        title: 'Upgrade to a business class',
        price: getRandomIntInclusive(100,200)
      },
    ]
  },

];

export {offers};
