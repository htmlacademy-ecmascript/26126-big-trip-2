import AbstractView from '../framework/view/abstract-view.js';
import {DATE_FORMAT_EVENT,TIME_FORMAT} from '../const.js';
import {getEventDuration, changeDateFormat, getPointTypeOffer,getDestinationById} from '../utils/point.js';

function createPointTemplate(point, dataOffers, dataDestinations) {
  const {type,basePrice,dateFrom, dateTo, isFavorite, offers} = point;

  const destinationById = getDestinationById(dataDestinations, point);
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);

  const favoriteButtonClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFrom}>${changeDateFormat(dateFrom,DATE_FORMAT_EVENT)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destinationById.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${changeDateFormat(dateFrom, TIME_FORMAT)}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${changeDateFormat(dateTo, TIME_FORMAT)}</time>
      </p>
      <p class="event__duration">${getEventDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${pointTypeOffer.offers.map((item)=>{
      const userOffer = offers.includes(item.id) ?
        `<li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </li>` : '';
      return userOffer;
    }).join('')}
    </ul>
    <button class="event__favorite-btn ${favoriteButtonClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
}

export default class PointView extends AbstractView{
  #point = null;
  #dataOffers = null;
  #dataDestinations = null;
  #handleEditArrowClick = null;
  #handleFavoriteClick = null;
  constructor({point, dataOffers, dataDestinations, onEditArrowClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    this.#handleEditArrowClick = onEditArrowClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editArrowClick);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#dataOffers, this.#dataDestinations);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #editArrowClick = (evt) => {
    evt.preventDefault();
    this.#handleEditArrowClick();
  };

}
