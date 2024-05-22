import {render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';

import {sortPointTime, sortPointPrice, sortPointDay} from '../utils/point.js';
import {SortType} from '../const.js';

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

  #sortComponent = null;
  #filterComponent = null;
  #emptyListComponent = new EmptyListView();

  #mainPoints = [];
  #offers = [];
  #destinations = [];

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedMainPoints = [];

  constructor({main, pointsModel, tripMain}) {
    this.#main = main;
    this.#tripMain = tripMain;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');
    this.#tripEventsContainer = this.#main.querySelector('.trip-events');
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#mainPoints = [...this.#pointsModel.points].sort(sortPointDay);
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#sourcedMainPoints = [...this.#pointsModel.points].sort(sortPointDay);

    this.#renderFilter();
    this.#renderSort();
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
    this.#sourcedMainPoints = updateItem(this.#mainPoints, updatedPoint);

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#mainPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#mainPoints.sort(sortPointPrice);
        break;
      case SortType.DAY:
        this.#mainPoints = [...this.#sourcedMainPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderFilter() {
    const filters = generateFilter(this.#mainPoints);
    this.#filterComponent = new FilterView({filters});
    render(this.#filterComponent, this.#filterContainer);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#tripEventsContainer);

    if(this.#mainPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(0, this.#mainPoints.length);
  }
}
