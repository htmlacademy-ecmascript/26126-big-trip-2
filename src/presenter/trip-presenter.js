import EditPointFormView from '../view/edit-point-form.js';
import FilterView from '../view/filters.js';
import NewPointFormView from '../view/new-point-form.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import {render, RenderPosition} from '../render.js';


export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor({main, pointsModel, tripMain}) {
    this.main = main;
    this.tripMain = tripMain;
    this.filterContainer = this.tripMain.querySelector('.trip-controls__filters');
    this.tripEventsContainer = this.main.querySelector('.trip-events');
    this.pointsModel = pointsModel;
  }

  init () {
    this.mainPoints = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.pointListComponent, this.tripEventsContainer);

    render(new EditPointFormView({point: this.mainPoints[0], dataOffers: this.offers, dataDestinations: this.destinations}), this.pointListComponent.getElement(), RenderPosition.AFTERBEGIN);

    render(new NewPointFormView({point: this.mainPoints[1], dataOffers: this.offers, dataDestinations: this.destinations}), this.pointListComponent.getElement());

    for (let i = 0; i < this.mainPoints.length; i++) {
      render(new PointView({point: this.mainPoints[i], dataOffers: this.offers, dataDestinations: this.destinations}), this.pointListComponent.getElement());
    }
  }
}
