import {render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {generateFilter} from '../utils/filterObject.js';
import FilterView from '../view/filters.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/no-point.js';

import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #pointsModel = null;
  #main = null;
  #tripMain = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointListView();

  #sortComponent = new SortView();
  #emptyListComponent = new EmptyListView();

  #mainPoints = [];
  #offers = [];
  #destinations = [];

  #pointPresenters = new Map();

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

    this.#renderPointList();
  }

  #renderPoint(point, dataOffers, dataDestinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, dataOffers, dataDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(from, to) {
    this.#mainPoints
      .slice(from, to)
      .forEach((point)=> this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderEmptyList (){
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #renderPointList() {
    const filters = generateFilter(this.#mainPoints);
    render(new FilterView({filters}), this.#filterContainer);

    render(this.#sortComponent, this.#tripEventsContainer);
    render(this.#pointListComponent, this.#tripEventsContainer);

    if(this.#mainPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(0, this.#mainPoints.length);
  }
}
