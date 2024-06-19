import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import {sortPointTime, sortPointPrice, sortPointDay} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

import {filter} from '../utils/filter-points.js';

import FilterPresenter from '../presenter/filter-presenter.js';
import AddPointPresenter from '../presenter/add-point-presenter.js';
import PointPresenter from './point-presenter.js';
import InfoTripPresenter from './info-trip-presenter.js';

import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import LoadingFailedView from '../view/load-failed-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #pointsModel = null;
  #tripMain = null;
  #filterModel = null;

  #filterContainer = null;
  #tripEventsContainer = null;
  #newEventButton = null;
  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #failedComponent = new LoadingFailedView();

  #sortComponent = null;
  #emptyListComponent = null;

  #pointPresenters = new Map();
  #addPointPresenter = null;
  #infoTripPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({pointsModel, tripMain, tripEventsContainer, filterModel, newEventButton, onAddEventDestroy}) {
    this.#tripMain = tripMain;
    this.#newEventButton = newEventButton;

    this.#filterModel = filterModel;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');

    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;


    this.#addPointPresenter = new AddPointPresenter({
      pointListContainerElement: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onAddEventDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    const defaultSortedPoints = filteredPoints.sort(sortPointDay);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return defaultSortedPoints;
  }

  get offers () {
    const offers = this.#pointsModel.offers;
    return offers;
  }

  get destinations () {
    const destinations = this.#pointsModel.destinations;
    return destinations;
  }

  init () {
    this.#newEventButton.disabled = true;
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING
    );
    if(this.#emptyListComponent){
      remove(this.#emptyListComponent);
    }
    this.#addPointPresenter.init(this.offers, this.destinations);
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
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        this.#infoTripPresenter.destroy();
        this.#renderInfoTrip();
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#newEventButton.disabled = false;
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
    }
  };

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
    this.#renderInfoTrip();
    this.#renderPointList();
  };

  #renderPoint(point, dataOffers, dataDestinations) {
    const pointPresenter = new PointPresenter({
      pointListContainerElement: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, dataOffers, dataDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point)=> this.#renderPoint(point, this.offers, this.destinations));
  }

  #renderInfoTrip() {
    if(this.points.length === 0) {
      return;
    }
    this.#infoTripPresenter = new InfoTripPresenter({
      tripMainElement: this.#tripMain,
    });
    this.#infoTripPresenter.init(this.#pointsModel.points, this.offers, this.destinations);
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
    if(this.#infoTripPresenter){
      this.#infoTripPresenter.destroy();
    }

    remove(this.#sortComponent);
    if(this.#emptyListComponent){
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainerElement: this.#filterContainer,
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
