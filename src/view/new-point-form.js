import PointFormView from '../view/point-form.js';
import {getPointTypeOffer, getDestinationById} from '../utils/point.js';

function createOffersTemplateForNewPoint(dataOffers, point) {
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);
  return (
    pointTypeOffer.offers.length !== 0 ?
      `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${pointTypeOffer.offers.map((item)=>
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointTypeOffer.type}-1" type="checkbox" name="event-offer-${pointTypeOffer.type}">
    <label class="event__offer-label" for="event-offer-${pointTypeOffer.type}-1">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join('')}
    </div>
  </section>` : ''
  );
}

function createDestinationTemplateForNewPoint(dataDestinations, point) {
  const destinationById = getDestinationById(dataDestinations, point);
  return (
    destinationById.description || destinationById.pictures ?
      `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationById.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destinationById.pictures.map((item)=>
      `<img class="event__photo" src=${item.src} alt="Event photo">`).join('')}
      </div>
    </div>
  </section>` : ''
  );
}

export default class addPointFormView extends PointFormView{


}
export{createOffersTemplateForNewPoint, createDestinationTemplateForNewPoint};
