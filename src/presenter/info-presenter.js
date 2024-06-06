import {remove, render, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info.js';

export default class InfoTripPresenter {
  #points = null;
  #dataOffers = null;
  #dataDestinations = null;

  #tripMainElement = null;

  #tripInfoComponent = null;

  constructor({tripMainElement}) {
    this.#tripMainElement = tripMainElement;
  }

  init(points, dataOffers, dataDestinations) {
    this.#points = points;
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    this.#tripInfoComponent = new TripInfoView({
      points: this.#points,
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
    });

    render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    remove(this.#tripInfoComponent);
  }
}
