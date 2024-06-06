import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import {sortPointTime, sortPointPrice, sortPointDay} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

import {filterObject} from '../utils/filterObject.js';

import FilterPresenter from '../presenter/filter-presenter.js';
import AddPointPresenter from '../presenter/add-point-presenter.js';

import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/no-point.js';
import LoadingView from '../view/loading.js';
import FailedView from '../view/load-failed.js';

import PointPresenter from './point-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #pointsModel = null;
  #main = null;
  #tripMain = null;
  #filterModel = null;

  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #failedComponent = new FailedView();

  #sortComponent = null;
  #emptyListComponent = null;

  //#offers = [];
  //#destinations = [];

  #pointPresenters = new Map();
  #addPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({main, pointsModel, tripMain, filterModel, onAddEventDestroy}) {
    this.#main = main;
    this.#tripMain = tripMain;

    this.#filterModel = filterModel;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');

    this.#tripEventsContainer = this.#main.querySelector('.trip-events');

    this.#pointsModel = pointsModel;


    this.#addPointPresenter = new AddPointPresenter({
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
    this.#addPointPresenter.init(this.#pointsModel.offers, this.#pointsModel.destinations);
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


  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch(updateType) {
      case UpdateType.PATCH:
      // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data, this.#pointsModel.offers, this.#pointsModel.destinations);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointList();
        break;
    }
  };

  init () {
    //this.#offers = this.#pointsModel.offers;
    //this.#destinations = [...this.#pointsModel.destinations];

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
    points.forEach((point)=> this.#renderPoint(point, this.#pointsModel.offers, this.#pointsModel.destinations));
  }

  #renderEmptyList (){
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #renderFailedLoad() {
    render(this.#failedComponent, this.#tripEventsContainer);
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#addPointPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
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
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if(this.#pointsModel.failed){
      this.#renderFailedLoad();
      return;
    }
    if(this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(points);
  }
}
