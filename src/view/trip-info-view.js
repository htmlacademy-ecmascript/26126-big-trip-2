import AbstractView from '../framework/view/abstract-view.js';
import {changeDateFormat, getDestinationById, sortPointDay} from '../utils/point.js';
import {getSumOfArray, getOffers} from '../utils/trip-info.js';

const DATE_FORMAT = 'DD MMM';
const CITIES_COUNT = 3;

function createTripInfoTemplate(points, dataOffers, dataDestinations) {
  if(points.length === 0) {
    return ('');
  } else {
    const sortedPoints = points.sort(sortPointDay);
    const firstPoint = sortedPoints[0];
    const secondPoint = sortedPoints[1];
    const lastPoint = sortedPoints[(sortedPoints.length - 1)];
    const basePrices = sortedPoints.map((item)=>item.basePrice);

    const offersOfPoints = getOffers(sortedPoints);
    const offersOfData = getOffers(dataOffers);

    const offersPrices = offersOfPoints.flat().map((offerOfPoints)=>{
      let price;
      offersOfData.flat().forEach((dataOffer)=>{
        if (dataOffer.id === offerOfPoints){
          price = dataOffer.price;
        }
      });
      return price;
    });

    const basePricesSum = getSumOfArray(basePrices);
    const totalPrice = getSumOfArray(offersPrices, basePricesSum);
    let secondCity = '';
    if(points.length >= CITIES_COUNT) {
      secondCity = getDestinationById(dataDestinations, secondPoint);
    }
    const startCity = getDestinationById(dataDestinations, firstPoint);
    const endCity = getDestinationById(dataDestinations, lastPoint);
    return (
      sortedPoints.length < CITIES_COUNT ?
        `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startCity ? startCity.name : ''} &mdash;
      &mdash; ${endCity ? endCity.name : ''}</h1>

      <p class="trip-info__dates">${changeDateFormat(firstPoint.dateFrom, DATE_FORMAT)}&nbsp;&mdash;&nbsp;${changeDateFormat(lastPoint.dateTo, DATE_FORMAT)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>` :
        `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startCity ? startCity.name : ''} &mdash;
      ${sortedPoints.length === CITIES_COUNT ? secondCity.name : '...'}
      &mdash; ${endCity ? endCity.name : ''}</h1>

      <p class="trip-info__dates">${changeDateFormat(firstPoint.dateFrom, DATE_FORMAT)}&nbsp;&mdash;&nbsp;${changeDateFormat(lastPoint.dateTo, DATE_FORMAT)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`
    );
  }
}

export default class TripInfoView extends AbstractView {
  #dataDestinations = null;
  #dataOffers = null;
  #points = null;
  constructor({points, dataOffers, dataDestinations}) {
    super();
    this.#points = points;
    this.#dataDestinations = dataDestinations;
    this.#dataOffers = dataOffers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#dataOffers, this.#dataDestinations);
  }
}
