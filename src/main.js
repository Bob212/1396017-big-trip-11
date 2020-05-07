import FilterTemplate from './components/filter.js';
import FormTemplate from './components/point-edit.js';
import FullCostTemplate from './components/full-cost.js';
import SiteMenuTemplate from './components/menu.js';
import PointTemplate from './components/point.js';
import SortTemplate from './components/sort.js';
import TripInfoWrapper from './components/trip-info-wrapper.js';
import TripInfoTemplate from './components/trip-info.js';
import DaysTemplate from './components/create-days.js';

import { generatePoints } from './mock/points.js';
import { render, RenderPosition } from './utils.js';

const POINTS_COUNT = 12;

let points = generatePoints(POINTS_COUNT);

points = points.sort((a, b) => {
	return a.startDate - b.startDate;
});

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripSortElement = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoWrapper().getElement(), RenderPosition.AFTERBEGIN);
const tripMainWrapperElement = document.querySelector(`.trip-main__trip-info.trip-info`);

render(tripMainWrapperElement, new TripInfoTemplate(points).getElement());
render(tripMainWrapperElement, new FullCostTemplate(points).getElement());

render(tripControlsElement, new SiteMenuTemplate().getElement());
render(tripControlsElement, new FilterTemplate().getElement());

const renderPoint = (containerElement, point) => {
  const replacePointElement = () => {
    containerElement.replaceChild(pointEditElement.getElement(), pointElement.getElement());
  };

  const replaceEditPointElement = () => {
    containerElement.replaceChild(pointElement.getElement(), pointEditElement.getElement());
  };

  const pointElement = new PointTemplate(point);
  const pointEditElement = new FormTemplate(point);

  // event for opening button
  const pointOpenButton = pointElement.getElement().querySelector(`.event__rollup-btn`);
  pointOpenButton.addEventListener(`click`, () => {
    replacePointElement()
  });

  // event for closing button
  const pointCloseButton = pointEditElement.getElement().querySelector(`.event__rollup-btn`);
  pointCloseButton.addEventListener(`click`, () => {
    replaceEditPointElement();
  });

  render(containerElement, pointElement.getElement());
};

const renderBoard = (parentComponent, points) => {
  // render sort template
  render(parentComponent, new SortTemplate().getElement());

  // render just days nums
  render(parentComponent, new DaysTemplate(points).getElement());
  const tripDaysElement = document.querySelector(`.trip-days`);

  // render points
  let identificatorForTheDay = points[0].startDate.getDate();
  let currentDayNum = 0;

  points.slice(0).forEach((point) => {
    if (point.startDate.getDate() !== identificatorForTheDay) {
      identificatorForTheDay = point.startDate.getDate();
      currentDayNum++;
    }

    const containerForPoint = tripDaysElement.children[currentDayNum].querySelector(`.trip-events__list`);
    renderPoint(containerForPoint, point);
  });
};

renderBoard(tripSortElement, points);
