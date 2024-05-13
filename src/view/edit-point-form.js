import PointFormView from '../view/point-form.js';

export default class EditPointFormView extends PointFormView{
  #handleEditFormSubmit = null;
  #handleEditFormButtonClick = null;

  constructor({point, dataOffers, dataDestinations, onEditFormSubmit, onEditFormButtonClick}) {
    super({point, dataOffers, dataDestinations});

    this.#handleEditFormSubmit = onEditFormSubmit;
    this.#handleEditFormButtonClick = onEditFormButtonClick;

    this.element.addEventListener('submit', this.#editFormSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editFormButtonHandler);
  }

  #editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditFormSubmit();
  };

  #editFormButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditFormButtonClick();
  };
}
