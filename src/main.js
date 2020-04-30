import { createFilterTemplate } from './components/filter.js'
import { createFormTemplate } from './components/point-edit.js'
import { createFullCostTemplate } from './components/full-cost.js'
import { createSiteMenuTemplate } from './components/menu.js'
import { createPointTemplate } from './components/point.js'
import { createSortTemplate } from './components/sort.js'
import { createTripInfoWrapperTemplate } from './components/trip-info-wrapper.js'
import { createTripInfoTemplate } from './components/trip-info.js'
import { generatePoints } from './mock/points.js'

const POINTS_COUNT = 12;

const points = generatePoints(POINTS_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripSortElement = document.querySelector(`.trip-events`);

render(tripMainElement, createTripInfoWrapperTemplate(), `afterbegin`);
const tripMainWrapperElement = document.querySelector(`.trip-main__trip-info.trip-info`);

render(tripMainWrapperElement, createTripInfoTemplate(points));
render(tripMainWrapperElement, createFullCostTemplate(points));

render(tripControlsElement, createSiteMenuTemplate());
render(tripControlsElement, createFilterTemplate());

render(tripSortElement, createSortTemplate());
render(tripSortElement, createFormTemplate(points[0]));

const tripEventListElement = document.querySelector(`.trip-events__list`);
for (let i = 1; i < points.length; i++) {
  render(tripEventListElement, createPointTemplate(points[i]));
}
