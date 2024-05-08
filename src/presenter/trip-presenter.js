import EditPointFormView from '../view/edit-point-form.js';
import FilterView from '../view/filters.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import {render, replace} from '../framework/render.js';


export default class TripPresenter {
  #pointsModel = null;
  #main = null;
  #tripMain = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointListView();

  #mainPoints = [];
  #offers = [];
  #destinations = [];

  constructor({main, pointsModel, tripMain}) {
    this.#main = main;
    this.#tripMain = tripMain;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');
    this.#tripEventsContainer = this.#main.querySelector('.trip-events');
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#mainPoints = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#pointListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#mainPoints.length; i++) {
      this.#renderPoint(this.#mainPoints[i], this.#offers, this.#destinations);
    }
  }

  #renderPoint(point, dataOffers, dataDestinations) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({point,
      dataOffers,
      dataDestinations,
      onEditArrowClick: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointFormView({point,
      dataOffers,
      dataDestinations,
      onEditFormSubmit: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditFormButtonClick: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditPoint(){
      replace(editPointComponent, pointComponent);
    }

    function replaceEditPointToPoint(){
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
