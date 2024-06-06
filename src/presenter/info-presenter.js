import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointFormView from '../view/edit-point-form.js';
import {UserAction, UpdateType} from '../const.js';

export default class InfoTripPresenter {
  #dataOffers = null;
  #dataDestinations = null;

  #pointListContainer = null;
  //#handleDataChange = null;
  //#handleDestroy = null;

  #editPointFormComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    //this.#handleDataChange = onDataChange;
    //this.#handleDestroy = onDestroy;
  }

  init(dataDestinations) {

    this.#dataDestinations = dataDestinations;

    if (this.#editPointFormComponent !== null) {
      return;
    }

    this.#editPointFormComponent = new EditPointFormView({
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
      buttonText: 'Cancel',
      createRollUp: '',
      isAddPoint: true,
      onEditFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#editPointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
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
    //this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

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

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
