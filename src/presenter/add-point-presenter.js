import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import {UserAction, UpdateType} from '../const.js';


export default class AddPointPresenter {
  #dataOffers = null;
  #dataDestinations = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #editPointFormComponent = null;

  constructor({pointListContainerElement, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainerElement;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(dataOffers, dataDestinations) {
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    if (this.#editPointFormComponent !== null) {
      return;
    }

    this.#editPointFormComponent = new EditPointFormView({
      dataDestinations: this.#dataDestinations,
      dataOffers: this.#dataOffers,
      buttonText: 'Cancel',
      isAddPoint: true,
      onEditFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
    });

    render(this.#editPointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointFormComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#editPointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointFormComponent);
    this.#editPointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
