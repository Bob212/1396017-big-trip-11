import NoPointsTemplate from '../components/no-points.js';
import DaysTemplate from '../components/create-days.js';
import SortTemplate from '../components/sort.js';
import PointTemplate from '../components/point.js';
import FormTemplate from '../components/point-edit.js';
import {render, replace} from '../utils/render.js';

const renderPoint = (containerElement, point) => {
  const replacePointElement = () => {
    replace(pointEditElement, pointElement);
  };

  const replaceEditPointElement = () => {
    replace(pointElement, pointEditElement);
  };

  const onEscDown = (evt) => {
    const isKeyEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isKeyEsc) {
      replaceEditPointElement();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  const pointElement = new PointTemplate(point);
  const pointEditElement = new FormTemplate(point);

  // event for opening button
  pointElement.setOpenButtonClickHandler(() => {
    replacePointElement();
    document.addEventListener(`keydown`, onEscDown);
  });

  // event for closing button
  pointEditElement.setCloseButtonClickHandler(() => {
    replaceEditPointElement();
  });

  render(containerElement, pointElement);
};

const renderDays = (containerElement, points) => {
  render(containerElement, new DaysTemplate(points));
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsTemplate();
    this._sortTemplate = new SortTemplate();
  }

  render(points) {
    if (points.length < 1) {
      render(this._container, this._noPointsComponent);
      return;
    }

    // render sort template
    render(this._container, this._sortTemplate);

    // render just days nums
    renderDays(this._container, points);
    const tripDaysElement = document.querySelector(`.trip-days`);

    // render points
    let identificatorForTheDay = points[0].startDate.getDate();
    let currentDayNum = 0;

    points.slice()
      .forEach((point) => {
        if (point.startDate.getDate() !== identificatorForTheDay) {
          identificatorForTheDay = point.startDate.getDate();
          currentDayNum++;
        }

        const containerForPoint = tripDaysElement.children[currentDayNum].querySelector(`.trip-events__list`);
        renderPoint(containerForPoint, point);
      });
  }
}
