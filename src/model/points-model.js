import {getRandomArrayElement} from '../utils/common.js';
import {offers} from '../mock/offers.js';
import {mockPoints} from '../mock/point.js';
import {destinations} from '../mock/destinations.js';

const POINT_COUNT = 3;

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export default class PointsModel {
  #points = Array.from({length:POINT_COUNT}, getRandomPoint);
  #dataOffers = offers;
  #dataDestinations = destinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#dataOffers;
  }

  get destinations() {
    return this.#dataDestinations;
  }
}

