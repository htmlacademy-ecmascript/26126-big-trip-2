import PointFormView from '../view/point-form.js';
import {getDestinationByTargetName} from '../utils/point.js';

export default class EditPointFormView extends PointFormView{
  _handleEditFormButtonClick = null;


  constructor({point, dataDestinations, dataOffers, buttonText, createRollUp, /*createOffersTemplate, createDestinationTemplate,*/ onEditFormSubmit, onEditFormButtonClick}) {
    super({point, dataDestinations, dataOffers, buttonText, createRollUp, /*createOffersTemplate, createDestinationTemplate,*/ onEditFormSubmit});

    this._setState(EditPointFormView.parsePointToState(point));

    this._handleEditFormButtonClick = onEditFormButtonClick;
    this._restoreHandlers();

  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this._editFormSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this._editFormButtonHandler);

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
  }

  #pointTypeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #pointDestinationInputHandler = (evt) => {
    evt.preventDefault();
    const destinationId = getDestinationByTargetName(this._dataDestinations, evt.target.value).id;
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

  _editFormButtonHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormButtonClick();
  };

}
