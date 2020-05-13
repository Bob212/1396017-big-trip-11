import NoPointsTemplate from '../components/no-points.js';
import DaysUl from '../components/days-ul.js';
import DaysLi from '../components/days-li.js';
import SortTemplate, {SortType} from '../components/sort.js';
import PointController from './point.js';
import {render} from '../utils/render.js';

const renderPointsBoard = (containerComponent, points, needToSortByDays, onDataChange, onViewChange) => {
  const containerElement = containerComponent.getElement();

  let dayComponent = false;
  let dayNum = 1;

  return points.slice()
    .map((point, index) => {
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

      const pointParentElement = dayComponent.getElement().querySelector(`.trip-events__list`);

      const pointController = new PointController(pointParentElement, onDataChange, onViewChange);

      pointController.render(point);

      return pointController;
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

    this._points = [];
    this._showedPointsControllers = [];
    this._noPointsComponent = new NoPointsTemplate();
    this._sortTemplate = new SortTemplate();
    this._daysUl = new DaysUl();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortTemplate.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    this._points = points;

    if (this._points.length < 1) {
      render(this._container, this._noPointsComponent);
      return;
    }

    // render sort template
    render(this._container, this._sortTemplate);

    // render UL container for points
    render(this._container, this._daysUl);

    // render points boards (one day === one board)
    const newPoints = renderPointsBoard(this._daysUl, this._points, true, this._onDataChange, this._onViewChange);
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._points, sortType);

    this._daysUl.getElement().innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      const newPoints = renderPointsBoard(this._daysUl, sortedPoints, true, this._onDataChange, this._onViewChange);
      this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
    } else {
      const newPoints = renderPointsBoard(this._daysUl, sortedPoints, false, this._onDataChange, this._onViewChange);
      this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
    }
  }

  _onDataChange(pointController, oldPoint, newPoint) {
    const index = this._points.findIndex((it) => it === oldPoint);

    if (index === -1) {
      return;
    }

    this._points[index] = newPoint;

    pointController.render(this._points[index]);
  }
}
