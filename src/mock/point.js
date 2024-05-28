import {getRandomIntInclusive} from '../utils/common.js';


const mockPoints = [
  {
    basePrice:  getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab1',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa32',
    ],
    type: 'taxi'
  },
  {
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-09T11:22:56.845Z',
    dateTo: '2019-07-09T12:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab2',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa35'
    ],
    type: 'bus'
  },
  {
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T08:00:56.845Z',
    dateTo: '2019-07-10T08:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab3',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa37'
    ],
    type: 'train'
  },
  {
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-06T22:55:56.845Z',
    dateTo: '2019-07-07T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa38',
      'b4c3e4e6-9053-42ce-b747-e281314baa39',
    ],
    type: 'flight'
  },
  {
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },

];

export{mockPoints};
