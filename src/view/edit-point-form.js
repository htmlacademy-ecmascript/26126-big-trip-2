import PointFormView from '../view/point-form.js';

export default class EditPointFormView extends PointFormView{
  _handleEditFormButtonClick = null;


  constructor({point, dataDestinations, buttonText, createRollUp, createOffersTemplate, createDestinationTemplate, onEditFormSubmit, onEditFormButtonClick}) {
    super({point, dataDestinations, buttonText, createRollUp, createOffersTemplate, createDestinationTemplate, onEditFormSubmit});

    this._handleEditFormButtonClick = onEditFormButtonClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this._editFormButtonHandler);
  }

  _editFormButtonHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormButtonClick();
  };
}
