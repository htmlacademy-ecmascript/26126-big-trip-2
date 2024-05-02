import {getRandomPoint} from '../mock/point.js';
import {offers} from '../mock/offers.js';
import {destinations} from '../mock/destinations.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length:POINT_COUNT}, getRandomPoint);
  dataOffers = offers;
  dataDestinations = destinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.dataOffers;
  }

  getDestinations() {
    return this.dataDestinations;
  }
}

