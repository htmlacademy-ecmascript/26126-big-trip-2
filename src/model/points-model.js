import {getRandomPoint} from '../mock/point.js';
import {offers} from '../mock/offers.js';
import {destinations} from '../mock/destinations.js';

const POINT_COUNT = 3;

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

