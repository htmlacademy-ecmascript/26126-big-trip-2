import AbstractView from '../framework/view/abstract-view.js';
import {changeDateFormat, getDestinationById, sortPointDay} from '../utils/point.js';

const DATE_FORMAT = 'DD MMM';
function createTripInfoTemplate(points, dataOffers, dataDestinations) {

  const sortedPoints = points.sort(sortPointDay);
  const firstPoint = sortedPoints[0];
  const secondPoint = sortedPoints[1];
  const lastPoint = sortedPoints[(sortedPoints.length - 1)];

  const initialValue = 0;
  const basePricesSum = sortedPoints.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, initialValue);

  const offersOfPoints = [];
  sortedPoints.forEach((point)=> {
    offersOfPoints.push(...point.offers);
  });

  const offersByData = [];
  dataOffers.forEach((item)=> {
    offersByData.push(...item.offers);
  });

  const offersPrices = [];

  offersByData.forEach((dataOffer)=>{
    offersOfPoints.forEach((offerOfPoints)=>{
      if (dataOffer.id === offerOfPoints){
        offersPrices.push(dataOffer.price);
      }
    });
  });

  const totalPrice = offersPrices.reduce((accumulator, currentValue) => accumulator + currentValue, basePricesSum);

  const startCity = getDestinationById(dataDestinations, firstPoint);
  const secondCity = getDestinationById(dataDestinations, secondPoint);
  const endCity = getDestinationById(dataDestinations, lastPoint);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startCity.name} &mdash;
      ${sortedPoints.length === 3 ? secondCity.name : '...'}
      &mdash; ${endCity.name}</h1>

      <p class="trip-info__dates">${changeDateFormat(firstPoint.dateFrom, DATE_FORMAT)}&nbsp;&mdash;&nbsp;${changeDateFormat(lastPoint.dateTo, DATE_FORMAT)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`
  );
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
