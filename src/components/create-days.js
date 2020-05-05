import moment from 'moment';

const createOneDay = (date, index) => {
  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${date}">${moment(date, `YYYY-MM-DD`).format(`MMMM DD`)}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>
  `;
};

export const createDaysTemplate = (points) => {
  let dates = new Set();

  points.forEach((point) => {
    dates.add(moment(point.startDate).format(`YY-MM-DD`));
  });

  dates = [...dates];

  const daysTemplate = dates.map((date, index) => {
    return createOneDay(date, index);
  }).join(`\n`);

  return `
    <ul class="trip-days">
      ${daysTemplate}
    </ul>
  `;
};
