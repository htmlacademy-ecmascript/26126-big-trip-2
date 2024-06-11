import AbstractView from '../framework/view/abstract-view.js';
import {SORTS, SortType} from '../const.js';

function createSortItemTemplate(sortType, currentSortType) {
  const disable = (sortType === SortType.EVENT || sortType === SortType.OFFERS) ? 'disabled' : '';
  return(`
  <div class="trip-sort__item  trip-sort__item--${sortType}">
  <input data-sort-type="${sortType}" id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"${disable}${sortType === currentSortType ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
</div>
  `);
}

function createSortTemplate(currentSortType) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTS.map((item)=> createSortItemTemplate(item, currentSortType)).join('')}
</form>`);
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #currentSortType = null;
  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    const sortInputs = this.element.querySelectorAll('.trip-sort__input');
    sortInputs.forEach((input)=>{
      input.addEventListener('click', this.#sortTypeClickHandler);
    });
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeClickHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
