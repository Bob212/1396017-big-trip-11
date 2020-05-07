import {createElement} from '../utils.js';

const createTripInfoWrapperTemplate = () => {
  return `
    <section class="trip-main__trip-info trip-info"></section>
  `;
};

export default class TripInfoWrapper {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoWrapperTemplate();
  }

  getElement() {
    if (!this.element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
