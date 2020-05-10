import NoPointsTemplate from '../components/no-points.js';
import DaysUl from '../components/days-ul.js';
import DaysLi from '../components/days-li.js';
import SortTemplate, {SortType} from '../components/sort.js';
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

const renderPointsBoard = (containerComponent, points, needToSortByDays) => {
  const containerElement = containerComponent.getElement();

  let dayComponent = false;
  let dayNum = 1;

  points.slice()
    .forEach((point, index) => {
      const prevPoint = points[index - 1];
      let isPrevPointHasSameDate = false;

      if (prevPoint) {
        isPrevPointHasSameDate = prevPoint.startDate.getDate() === point.startDate.getDate();
      }

      if (!isPrevPointHasSameDate) {
        if (needToSortByDays) {
          dayComponent = new DaysLi(point.startDate, dayNum);
          render(containerElement, dayComponent);
          dayNum++;
        } else if (!dayComponent) {
          dayComponent = new DaysLi();
          render(containerElement, dayComponent);
        }
      }

      renderPoint(dayComponent.getElement().querySelector(`.trip-events__list`), point);
    });
};

const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedPoints = showingPoints.sort((a, b) => a.startDate - b.startDate);
      break;
    case SortType.BY_TIME:
      sortedPoints = showingPoints.sort((a, b) => {
        return (a.startDate.getHours() * 60 + a.startDate.getMinutes()) - (b.startDate.getHours() * 60 + b.startDate.getMinutes());
      });
      break;
    case SortType.BY_PRICE:
      sortedPoints = showingPoints.sort((a, b) => a.price - b.price);
      break;
  }

  return sortedPoints;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsTemplate();
    this._sortTemplate = new SortTemplate();
    this._daysUl = new DaysUl();
  }

  render(points) {
    if (points.length < 1) {
      render(this._container, this._noPointsComponent);
      return;
    }

    // render sort template
    render(this._container, this._sortTemplate);
    this._sortTemplate.setSortTypeChangeHandler((sortType) => {
      const sortedPoints = getSortedPoints(points, sortType);

      this._daysUl.getElement().innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        renderPointsBoard(this._daysUl, sortedPoints, true);
      } else {
        renderPointsBoard(this._daysUl, sortedPoints, false);
      }
    });

    // render UL container for points
    render(this._container, this._daysUl);

    // render points board
    renderPointsBoard(this._daysUl, points, true);
  }
}
