import PointFormView from './point-form-view.js';
import {getDestinationByTargetName, getNewDateAddOneMinute} from '../utils/point.js';

import {BLANK_POINT} from '../const.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DATE_FORMAT_FLATPICKR = 'j/m/y H:i';

export default class EditPointFormView extends PointFormView{
  _handleEditFormButtonClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = BLANK_POINT, dataDestinations, dataOffers, buttonText, isAddPoint, createRollUp, onEditFormSubmit, onEditFormButtonClick, onDeleteClick}) {
    super({point, dataDestinations, dataOffers,isAddPoint, buttonText, createRollUp, onEditFormSubmit});

    this._setState(EditPointFormView.parsePointToState(point));
    this._handleEditFormButtonClick = onEditFormButtonClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();

  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this._editFormSubmitHandler);
    if(this.element.querySelector('.event__rollup-btn')){
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this._editFormButtonHandler);
    }

    this.element.querySelectorAll('.event__type-input')
      .forEach((type)=> {
        type.addEventListener('click',this.#pointTypeInputHandler);
      });

    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((checkbox)=> {
        checkbox.addEventListener('change', this.#pointOfferInputHandler);
      });

    this.element.querySelector('.event__input--destination')
      .addEventListener('change',this.#pointDestinationInputHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change',this.#pointPriceInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: DATE_FORMAT_FLATPICKR,
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateChangeHandler,
        allowInput:true
      },

    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: DATE_FORMAT_FLATPICKR,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom ? getNewDateAddOneMinute(this._state.dateFrom) : this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        allowInput: true,
      },
    );
  }

  _editFormButtonHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormButtonClick();
  };

  #pointTypeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #pointDestinationInputHandler = (evt) => {
    evt.preventDefault();
    const destinationByTargetName = getDestinationByTargetName(this._dataDestinations, evt.target.value);
    const destinationId = destinationByTargetName ? destinationByTargetName.id : null;
    this.updateElement({
      destination: destinationId ? destinationId : ''
    });
  };

  #pointOfferInputHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedOffers.map((offer)=>offer.dataset.offerId)
    });
  };

  #pointPriceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #dateChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
      dateTo: getNewDateAddOneMinute(userDateFrom)
    });
  };

  #dateToChangeHandler = ([userTo]) => {
    this.updateElement({
      dateTo: userTo,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointFormView.parseStateToPoint(this._state));
  };
}
