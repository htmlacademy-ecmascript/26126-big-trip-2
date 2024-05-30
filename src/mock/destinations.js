import {getRandomIntInclusive} from '../utils/common.js';

const destinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomIntInclusive(1,5)}`,
        description: 'Amsterdam parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomIntInclusive(1,5)}`,
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab2',
    description: '',
    name: '',
    pictures: []
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab3',
    description: 'Aliquam id orci ut lectus varius viverra.',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomIntInclusive(1,5)}`,
        description: 'Geneva parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomIntInclusive(1,5)}`,
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    description: 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomIntInclusive(1,5)}`,
        description: 'Chamonix parliament building'
      }]
  }
];

export {destinations};
