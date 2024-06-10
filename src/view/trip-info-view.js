import AbstractView from '../framework/view/abstract-view.js';
import {changeDateFormat, getDestinationById, sortPointDay} from '../utils/point.js';
import {getSumOfArray, getOffers} from '../utils/trip-info.js';

const DATE_FORMAT = 'DD MMM';

function createTripInfoTemplate(points, dataOffers, dataDestinations) {

  const sortedPoints = points.sort(sortPointDay);
  const firstPoint = sortedPoints[0];
  const secondPoint = sortedPoints[1];
  const lastPoint = sortedPoints[(sortedPoints.length - 1)];
  const basePrices = sortedPoints.map((item)=>item.basePrice);

  const offersOfPoints = getOffers(sortedPoints);
  const offersOfData = getOffers(dataOffers);

  const offersPrices = offersOfPoints.flat().map((offerOfPoints)=>{
    let price = 0;
    offersOfData.flat().forEach((dataOffer)=>{
      if (dataOffer.id === offerOfPoints){
        price = dataOffer.price;
      }
    });
    return price;
  });

  const basePricesSum = getSumOfArray(basePrices);
  const totalPrice = getSumOfArray(offersPrices, basePricesSum);

  const startCity = getDestinationById(dataDestinations, firstPoint);
  const secondCity = getDestinationById(dataDestinations, secondPoint);
  const endCity = getDestinationById(dataDestinations, lastPoint);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startCity.name} &mdash;
      ${sortedPoints.length <= 3 ? secondCity.name : '...'}
      &mdash; ${endCity.name === secondCity.name ? '' : endCity.name}</h1>

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
