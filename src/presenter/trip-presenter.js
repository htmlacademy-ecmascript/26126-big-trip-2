import EditPointFormView from '../view/edit-point-form.js';
import FilterView from '../view/filters.js';
import NewPointFormView from '../view/new-point-form.js';
import PointView from '../view/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import {render, RenderPosition} from '../render.js';


export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor({main},{filterContainer},{tripEventsContainer}) {
    this.main = main;
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init () {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.pointListComponent, this.tripEventsContainer);

    render(new EditPointFormView(), this.pointListComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewPointFormView(), this.pointListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
