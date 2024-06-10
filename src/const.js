const DATE_FORMAT_EVENT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_EVENT_START = 'DD/MM/YY HH:MM';

const POINTS_URL = 'big-trip/points';
const OFFERS_URL = 'big-trip/offers';
const DESTINATIONS_URL = 'big-trip/destinations';

const AUTHORIZATION = 'Basic ethictghetma';
const END_POINT = 'https://22.objects.htmlacademy.pro';

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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};


export {DATE_FORMAT_EVENT, TIME_FORMAT, DATE_FORMAT_EVENT_START, FilterType, TYPES, SortType, SORTS, UserAction, UpdateType, BLANK_POINT, POINTS_URL, OFFERS_URL, DESTINATIONS_URL, AUTHORIZATION, END_POINT};
