const DATE_FORMAT_EVENT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_EVENT_START = 'DD/MM/YY HH:MM';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS:'offers',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORTS = Object.values(SortType);
const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

const CANCEL = 'Cancel';
const DELETE = 'Delete';


export {DATE_FORMAT_EVENT, TIME_FORMAT, DATE_FORMAT_EVENT_START, FilterType, TYPES, CITIES, CANCEL, DELETE, SortType, SORTS};
