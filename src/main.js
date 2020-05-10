import FilterTemplate from './components/filter.js';
import FullCostTemplate from './components/full-cost.js';
import SiteMenuTemplate from './components/menu.js';
import TripInfoWrapper from './components/trip-info-wrapper.js';
import TripInfoTemplate from './components/trip-info.js';

import TripController from './controllers/trip.js';

import { generatePoints } from './mock/points.js';
import { render, RenderPosition } from './utils/render.js';

const POINTS_COUNT = 12;

let points = generatePoints(POINTS_COUNT);

points = points.sort((a, b) => {
	return a.startDate - b.startDate;
});

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);

render(tripMainElement, new TripInfoWrapper(), RenderPosition.AFTERBEGIN);
const tripMainWrapperElement = document.querySelector(`.trip-main__trip-info.trip-info`);

render(tripMainWrapperElement, new TripInfoTemplate(points));
render(tripMainWrapperElement, new FullCostTemplate(points));

render(tripControlsElement, new SiteMenuTemplate());
render(tripControlsElement, new FilterTemplate());

// rendering main section
const mainSectionElement = document.querySelector(`.trip-events`);
const tripController = new TripController(mainSectionElement);
tripController.render(points);
