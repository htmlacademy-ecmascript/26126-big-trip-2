import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(point, dataDestinations) {
  const {basePrice, dateFrom, dateTo} = point;
  const {name} = dataDestinations;
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${name}</h1>

      <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice}</span>
    </p>
  </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #dataDestinations = null;
  #point = null;
  constructor({point, dataDestinations}) {
    super();
    this.#dataDestinations = dataDestinations;
    this.#point = point;
  }

  get template() {
    return createTripInfoTemplate(this.#point, this.#dataDestinations);
  }
}
