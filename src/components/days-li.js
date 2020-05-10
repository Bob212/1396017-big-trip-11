import AbstractComponent from "./abstract-component.js";
import moment from 'moment';

const createDaysLi = (date, index) => {
  const dayNum = index || ``;
  const dateElement = date ? `<time class="day__date" datetime="${moment(date).format(`YYYY-MM-DD`)}">${moment(date).format(`MMMM DD`)}</time>` : ``;

  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNum}</span>
        ${dateElement}
      </div>

      <ul class="trip-events__list"></ul>
    </li>
  `;
};

export default class DaysLi extends AbstractComponent {
  constructor(date, dayNum) {
    super();
    this._date = date;
    this._dayNum = dayNum;
  }

  getTemplate() {
    return createDaysLi(this._date, this._dayNum);
  }
}
