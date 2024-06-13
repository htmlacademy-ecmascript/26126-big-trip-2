import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TYPES} from '../const.js';
import {getPointTypeOffer, getDestinationById} from '../utils/point.js';
import he from 'he';

function createTypeItemTemplate(type, id) {
  return(`
  <div class="event__type-item">
  <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
</div>
  `);
}

function createOffersSelectorTemplate(dataOffers, point, isAddPoint) {
  const {offers} = point;
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);
  if(isAddPoint) {
    return (
      pointTypeOffer.offers.length !== 0 ?
        `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${pointTypeOffer.offers.map((item, index)=>
        `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" data-offer-id="${item.id}" id="event-offer-${pointTypeOffer.type}-${index}" type="checkbox" name="event-offer-${pointTypeOffer.type}">
    <label class="event__offer-label" for="event-offer-${pointTypeOffer.type}-${index}">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join('')}
    </div>
  </section>` : ''
    );
  } else{
    return (
      pointTypeOffer.offers.length !== 0 ?
        `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${pointTypeOffer.offers.map((item, index)=> {
        const checkedOffers = offers.includes(item.id) ? 'checked' : '';
        return (`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"  data-offer-id="${item.id}" id="event-offer-${pointTypeOffer.type}-${index}" type="checkbox" name="event-offer-${pointTypeOffer.type}"
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

}

function createDestinationSelectorTemplate(dataDestinations, point, isAddPoint) {

  const destinationById = getDestinationById(dataDestinations, point);
  if(isAddPoint && !destinationById ||
    (destinationById.description === ''
      && destinationById.pictures.length === 0)) {
    return (
      ''
    );
  }else {
    return (
      `<section class="event__section  event__section--destination">
      ${destinationById.description ?
        `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationById.description}</p>` : ''
      }

      ${destinationById.pictures.length !== 0 ?
        `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${destinationById.pictures.map((item)=>
        `<img class="event__photo" src=${item.src} alt="Event photo">`).join('')}
        </div>
      </div>` : ''
      }

    </section>`
    );
  }

}

function createRollUpTemplate (isDisabled) {
  return(
    `<button class="event__rollup-btn" type="button"
    ${isDisabled ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`
  );
}

function createEditPointFormTemplate(point, dataDestinations, dataOffers, buttonText, isAddPoint) {
  //const reset = document.querySelector('.event__reset-btn');

  const cities = dataDestinations.map((item)=>item.name);
  const {type, basePrice, isDisabled, isSaving, isDeleting} = point;
  const destinationById = getDestinationById(dataDestinations, point);

  return (`<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${TYPES.map((item)=> createTypeItemTemplate(item, point.id)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${point.id}">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinationById ? he.encode(destinationById.name) : ''}" list="destination-list-${point.id}" required>
      <datalist id="destination-list-${point.id}">
      ${cities.map((city)=>`<option value="${city}"></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" placeholder ="Select date" value="" required>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time"  placeholder ="Select date" value="" required>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${point.id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      ${isAddPoint ? `<input class="event__input  event__input--price" id="event-price-${point.id}" type="number" min="1" name="event-price" value="${basePrice ? basePrice : 0}" required>` :
      `<input class="event__input  event__input--price" id="event-price-${point.id}" type="number" min="1" name="event-price" value="${basePrice}" required>`
    }

    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting' : buttonText }</button>
    ${isAddPoint ? '' : createRollUpTemplate(isDisabled)}
  </header>
  <section class="event__details">
  ${createOffersSelectorTemplate(dataOffers, point, isAddPoint)}
  ${createDestinationSelectorTemplate(dataDestinations, point, isAddPoint)}
  </section>
</form>`);
}

export default class PointFormView extends AbstractStatefulView {
  _dataOffers = null;
  _dataDestinations = null;
  _handleEditFormSubmit = null;

  _buttonText = null;


  constructor({point, dataDestinations, dataOffers, buttonText, isAddPoint, onEditFormSubmit}) {
    super();
    this._dataOffers = dataOffers;
    this._dataDestinations = dataDestinations;

    this._isAddPoint = isAddPoint;
    this._buttonText = buttonText;

    this._setState(PointFormView.parsePointToState(point));
    this._handleEditFormSubmit = onEditFormSubmit;
    this.element.addEventListener('submit', this._editFormSubmitHandler);
  }


  get template() {
    return createEditPointFormTemplate(this._state, this._dataDestinations,this._dataOffers, this._buttonText,this._isAddPoint);
  }

  reset(point) {
    this.updateElement(
      PointFormView.parsePointToState(point),
    );
  }

  _editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormSubmit(PointFormView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
