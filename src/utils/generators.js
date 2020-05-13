import {DEFAULT_DESCRIPTIONS, DEFAULT_OFFERS} from '../const.js';

export const generateDesctiption = () => {
  // creating title
  const sentencesCount = getRandomIntegerNumber(1, 6);
  let title = ``;

  for (let i = 0; i < sentencesCount; i++) {
    title += `${DEFAULT_DESCRIPTIONS[Math.floor(Math.random() * 11)]}`;
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

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const generateOffers = () => {
  const offersCount = getRandomIntegerNumber(0, 4);
  const offersArray = [];

  for (let i = 0; i < offersCount; i++) {
    offersArray.push(DEFAULT_OFFERS[getRandomIntegerNumber(0, 5)]);
  }

  return offersArray;
};
