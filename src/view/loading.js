import AbstractView from '../framework/view/abstract-view.js';

function createLoadingemplate() {
  return (
    ' <p class="trip-events__msg">Loading...</p>'
  );
}

export default class FailedView extends AbstractView {
  get template() {
    return createLoadingemplate();
  }
}
