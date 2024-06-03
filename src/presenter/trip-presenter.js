import {render, remove} from '../framework/render.js';
//import {updateItem} from '../utils/common.js';

import {sortPointTime, sortPointPrice, sortPointDay} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

import {filterObject} from '../utils/filterObject.js';

import FilterPresenter from '../presenter/filter-presenter.js';
import AddPointPresenter from '../presenter/add-point-presenter.js';

import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/no-point.js';

import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #pointsModel = null;
  #main = null;
  #tripMain = null;
  #filterModel = null;

  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointListView();

  #sortComponent = null;
  #emptyListComponent = null;

  #offers = [];
  #destinations = [];

  #pointPresenters = new Map();
  #AddPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;


  constructor({main, pointsModel, tripMain, filterModel, onAddEventDestroy}) {
    this.#main = main;
    this.#tripMain = tripMain;

    this.#filterModel = filterModel;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');

    this.#tripEventsContainer = this.#main.querySelector('.trip-events');

    this.#pointsModel = pointsModel;

    this.#AddPointPresenter = new AddPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onAddEventDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING
    );
    this.#AddPointPresenter.init(this.#offers, this.#destinations);
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterObject[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints.sort(sortPointDay);
  }


  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch(updateType) {
      case UpdateType.PATCH:
      // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointList();
        break;
    }
  };

  init () {
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  #renderPoint(point, dataOffers, dataDestinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, dataOffers, dataDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point)=> this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #renderEmptyList (){
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#AddPointPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#AddPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    //this.#sortPoints(sortType);
    this.#currentSortType = sortType;
    this.#clearTripBoard();
    this.#renderSort();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#filterContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    filterPresenter.init();
  }

  #renderPointList() {
    const points = this.points.slice(0, this.points.length);
    render(this.#pointListComponent, this.#tripEventsContainer);

    if(this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(points);
  }
}
