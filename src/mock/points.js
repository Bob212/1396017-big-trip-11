import {formatMinutes} from '../utils/common.js';
import {POINT_TYPES, DESTINATION_LIST} from '../const.js';
import {generateDesctiption, getRandomIntegerNumber, generateOffers} from '../utils/generators.js';

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateStartAndEndDates = () => {
  const hoursOffset = getRandomIntegerNumber(0, 10);
  const startDate = new Date();
  startDate.setHours(new Date().getHours() + hoursOffset);
  const endDate = new Date();
  endDate.setHours(new Date().getHours() + hoursOffset);
  const dateOffset = getRandomIntegerNumber(0, 4);

  startDate.setDate(startDate.getDate() + dateOffset);
  endDate.setDate(endDate.getDate() + dateOffset);

  const minutesOffset = getRandomIntegerNumber(30, 121);
  endDate.setMinutes(endDate.getMinutes() + minutesOffset);

  return {
    startDate,
    endDate,
    duration: formatMinutes(minutesOffset),
  };
};

const generatePoint = () => {
  const {startDate, endDate, duration} = generateStartAndEndDates();

  return {
    type: getRandomArrayItem(POINT_TYPES),
    destination: getRandomArrayItem(DESTINATION_LIST),
    description: generateDesctiption(),
    startDate,
    endDate,
    duration,
    price: Math.floor(Math.random() * 100),
    offers: generateOffers(),
    isFavorite: Math.random() > 0.5,
  };
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export {generatePoint, generatePoints};
