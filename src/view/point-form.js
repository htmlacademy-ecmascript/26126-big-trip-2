import AbstractView from '../framework/view/abstract-view.js';
import {DATE_FORMAT_EVENT_START, TYPES, CITIES} from '../const.js';
import {changeDateFormat, getPointTypeOffer,getDestinationById} from '../utils/point.js';

function createTypeItemTemplate(type) {
  return(`
  <div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>
  `);
}

function createOffersSelectorTemplate(dataOffers, point) {
  const {offers} = point;
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);
  return (
    pointTypeOffer.offers.length !== 0 ?
      `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${pointTypeOffer.offers.map((item, index)=> {
      const checkedOffers = offers.includes(item.id) ? 'checked' : '';
      return (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointTypeOffer.type}-${index}" type="checkbox" name="event-offer-${pointTypeOffer.type}"
        ${checkedOffers}>
        <label class="event__offer-label" for="event-offer-${pointTypeOffer.type}-${index}">
          <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
      </div>`);
    }
    ).join('')}
    </div>
  </section>` : ''
  );
}

function createDestinationSelectorTemplate(dataDestinations, point) {
  const destinationById = getDestinationById(dataDestinations, point);
  return (
    destinationById.description || destinationById.pictures ?
      `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationById.description}</p>
  </section>` : ''
  );
}

function createRollUpTemplate () {
  return(
    `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
  );
}

function createEditPointFormTemplate(point, dataDestinations, buttonText, createRollUp, createOffersTemplate, createDestinationTemplate) {
  const {type,basePrice,dateFrom, dateTo} = point;
  const destinationById = getDestinationById(dataDestinations, point);

  return (`<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${TYPES.map((item)=> createTypeItemTemplate(item)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationById.name}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${CITIES.map((city)=>`<option value="${city}"></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${changeDateFormat(dateFrom,DATE_FORMAT_EVENT_START)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${changeDateFormat(dateTo,DATE_FORMAT_EVENT_START)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${buttonText}</button>
    ${createRollUp}
  </header>
  <section class="event__details">
  ${createOffersTemplate}
  ${createDestinationTemplate}
  </section>
</form>`);
}

export default class PointFormView extends AbstractView{
  _point = null;
  //_dataOffers = null;
  _dataDestinations = null;
  _handleEditFormSubmit = null;
  _buttonText = null;
  createRollUp = null;
  createOffersTemplate = null;
  createDestinationTemplate = null;
  constructor({point, dataDestinations, buttonText, createRollUp, createOffersTemplate, createDestinationTemplate, onEditFormSubmit}) {
    super();
    this._point = point;
    //this._dataOffers = dataOffers;
    this._dataDestinations = dataDestinations;
    this.createOffersTemplate = createOffersTemplate;
    this.createDestinationTemplate = createDestinationTemplate;
    this._buttonText = buttonText;
    this.createRollUp = createRollUp;

    this._handleEditFormSubmit = onEditFormSubmit;
    this.element.addEventListener('submit', this._editFormSubmitHandler);
  }

  _editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormSubmit();
  };


  get template() {
    return createEditPointFormTemplate(this._point, this._dataDestinations, this._buttonText, this.createRollUp, this.createOffersTemplate, this.createDestinationTemplate);

  }
}

export {createRollUpTemplate, createOffersSelectorTemplate, createDestinationSelectorTemplate};
