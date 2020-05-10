import {formatMinutes} from '../utils/common.js';
import {POINT_TYPES, DESTINATION_LIST} from '../const.js';


const DefaultDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const DefaultOffers = [
  {
    title: `Rent a car`,
    price: 200,
  }, {
    title: `Take a shower`,
    price: 50,
  }, {
    title: `Book tickets`,
    price: 40
  }, {
    title: `Lunch in city`,
    price: 30,
  }, {
    title: `Add breakfast`,
    price: 50,
  }
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateDesctiption = () => {
  // creating title
  const sentencesCount = getRandomIntegerNumber(1, 6);
  let title = ``;

  for (let i = 0; i < sentencesCount; i++) {
    title += `${DefaultDescriptions[Math.floor(Math.random() * 11)]}`;
  }

  // creating img src array
  const imgCount = getRandomIntegerNumber(1, 6);
  const img = [];

  for (let i = 0; i < imgCount; i++) {
    img.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return {
    title,
    img,
  };
};

const generateStartAndEndDates = () => {
  const startDate = new Date();
  const endDate = new Date();
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

const generateOffers = () => {
  const offersCount = getRandomIntegerNumber(0, 4);
  const offersArray = [];

  for (let i = 0; i < offersCount; i++) {
    offersArray.push(DefaultOffers[getRandomIntegerNumber(0, 5)]);
  }

  return offersArray;
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
    isFavourite: Math.random() > 0.5,
  };
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export {generatePoint, generatePoints};
