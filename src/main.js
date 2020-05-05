import { createFilterTemplate } from './components/filter.js'
import { createFormTemplate } from './components/point-edit.js'
import { createFullCostTemplate } from './components/full-cost.js'
import { createSiteMenuTemplate } from './components/menu.js'
import { createPointTemplate } from './components/point.js'
import { createSortTemplate } from './components/sort.js'
import { createTripInfoWrapperTemplate } from './components/trip-info-wrapper.js'
import { createTripInfoTemplate } from './components/trip-info.js'
import { createDaysTemplate } from './components/create-days.js'
import { generatePoints } from './mock/points.js'

const POINTS_COUNT = 12;

let points = generatePoints(POINTS_COUNT);

points = points.sort((a, b) => {
	return a.startDate - b.startDate;
});

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

// render just days nums
render(tripSortElement, createDaysTemplate(points));
const tripDaysElement = document.querySelector(`.trip-days`);

// render day-edit pin
render(tripDaysElement.querySelector(`.trip-events__list`), createFormTemplate(points[0]));

// render another days pin
let identificatorForTheDay = points[1].startDate.getDate();

for (let i = 1, j = 0; i < points.length; i++) {
	if (points[i].startDate.getDate() !== identificatorForTheDay) {
		identificatorForTheDay = points[i].startDate.getDate();
		j++;
	}

  render(tripDaysElement.children[j].querySelector(`.trip-events__list`), createPointTemplate(points[i]));
}
