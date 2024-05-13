const DATE_FORMAT_EVENT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_EVENT_START = 'DD/MM/YY HH:MM';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORTS = ['day', 'event', 'time', 'price', 'offers'];
const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

const CANCEL = 'Cancel';
const DELETE = 'Delete';
export {DATE_FORMAT_EVENT, TIME_FORMAT, DATE_FORMAT_EVENT_START, FilterType, TYPES, SORTS, CITIES, CANCEL, DELETE};
