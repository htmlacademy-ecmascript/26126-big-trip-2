import {render, replace, remove} from '../framework/render.js';

import PointView from '../view/point.js';
import EditPointFormView from '../view/edit-point-form.js';

import {createRollUpTemplate, createOffersSelectorTemplate, createDestinationSelectorTemplate} from '../view/point-form.js';
import {DELETE, CANCEL} from '../const.js';

import NewPointFormView from '../view/new-point-form.js';
import {createOffersTemplateForNewPoint, createDestinationTemplateForNewPoint} from '../view/new-point-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointNewComponent = null;
  #editPointComponent = null;

  #point = null;
  #dataOffers = null;
  #dataDestinations = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}){
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

  }

  init(point, dataOffers, dataDestinations){
    this.#point = point;
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,

      onEditArrowClick: this.#handlePointArrowClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointNewComponent = new NewPointFormView({
      point: this.#point,
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
      buttonText: CANCEL,
      createRollUp: '',
      createOffersTemplate: createOffersTemplateForNewPoint(dataOffers, point),
      createDestinationTemplate: createDestinationTemplateForNewPoint(dataDestinations, point),
      onEditFormSubmit: this.#handleFormSubmit
    });

    this.#editPointComponent = new EditPointFormView({
      point: this.#point,
      dataDestinations: this.#dataDestinations,
      buttonText: DELETE,
      createRollUp: createRollUpTemplate(),
      createOffersTemplate: createOffersSelectorTemplate(this.#dataOffers, this.#point),
      createDestinationTemplate: createDestinationSelectorTemplate(this.#dataDestinations, this.#point),

      onEditFormSubmit: this.#handleFormSubmit,
      onEditFormButtonClick: this.#handleEditClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditPointToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #replacePointToEditPoint(){
    replace(this.#editPointComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint(){
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handlePointArrowClick = () => {
    this.#replacePointToEditPoint();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

}
