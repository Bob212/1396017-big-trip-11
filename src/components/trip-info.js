import moment from 'moment';

export const createTripInfoTemplate = (points) => {
  const transferPoints = points.filter((point) => {
    return point.type.type === `transfer`;
  });

  const firstPoint = transferPoints[0];
  const lastPoint = transferPoints[transferPoints.length - 1];

  const transferPointsNamesString = transferPoints.map((point) => point.destination).join(` &mdash;`);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${transferPointsNamesString}</h1>

      <p class="trip-info__dates">${moment(firstPoint.startDate).format(`MMMM DD`)}&nbsp;&mdash;&nbsp;${moment(lastPoint.endDate).format(`MMMM DD`)}</p>
    </div>
  `;
};
