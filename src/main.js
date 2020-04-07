import { createFilterTemplate } from './components/filter.js'
import { createFormTemplate } from './components/form.js'
import { createFullCostTemplate } from './components/full-cost.js'
import { createSiteMenuTemplate } from './components/menu.js'
import { createPointTemplate } from './components/point.js'
import { createSortTemplate } from './components/sort.js'
import { createTripInfoWrapperTemplate } from './components/trip-info-wrapper.js'
import { createTripInfoTemplate } from './components/trip-info.js'

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripSortElement = document.querySelector(`.trip-events`);

render(tripMainElement, createTripInfoWrapperTemplate(), `afterbegin`);
const tripMainWrapperElement = document.querySelector(`.trip-main__trip-info.trip-info`);

render(tripMainWrapperElement, createTripInfoTemplate());
render(tripMainWrapperElement, createFullCostTemplate());

render(tripControlsElement, createSiteMenuTemplate());
render(tripControlsElement, createFilterTemplate());

render(tripSortElement, createSortTemplate());
render(tripSortElement, createFormTemplate());

const tripEventListElement = document.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(tripEventListElement, createPointTemplate());
}
