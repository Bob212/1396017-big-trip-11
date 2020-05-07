import moment from 'moment';
import {createElement} from '../utils.js';

const createTripInfoTemplate = (points) => {
  const transferPoints = points.filter((point) => {
    return point.type.type === `transfer`;
  });

  const firstPoint = transferPoints[0];
  const lastPoint = transferPoints[transferPoints.length - 1];

  const transferPointsNamesString = transferPoints.map((point) => point.destination).join(` &mdash;`);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${transferPointsNamesString}</h1>

      <p class="trip-info__dates">${moment(firstPoint.startDate).format(`MMMM DD`)}&nbsp;&mdash;&nbsp;${moment(lastPoint.endDate).format(`MMMM DD`)}</p>
    </div>
  `;
};

export default class TripInfoTemplate {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
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
