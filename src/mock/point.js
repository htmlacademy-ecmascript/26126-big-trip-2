import {getRandomIntInclusive} from '../utils/common.js';


const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c1',
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
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c2',
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T11:22:56.845Z',
    dateTo: '2019-07-10T12:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab2',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa35'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c3',
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab3',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa37'
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c4',
    basePrice: getRandomIntInclusive(100, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa38',
      'b4c3e4e6-9053-42ce-b747-e281314baa39',
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c4',
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
