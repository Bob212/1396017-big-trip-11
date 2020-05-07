import {createElement, formatDate, typeWithPretext} from '../utils.js';

const createOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>
    `;
  }).join(`\n`);
};

const createPointTemplate = (point) => {
  const {
    type,
    destination,
    startDate,
    endDate,
    duration,
    price,
    offers
  } = point;

  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeWithPretext(type)} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${formatDate(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}">${formatDate(endDate)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${offers.length > 0 ? `
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${createOffersTemplate(offers)}
            </ul>
          ` : ``}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class PointTemplate {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
