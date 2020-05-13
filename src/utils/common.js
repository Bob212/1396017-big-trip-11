import moment from 'moment';

const castTimeFormat = (number) => {
  return number < 10 ? `0${number}` : String(number);
};

export const formatMinutes = (minutes) => {
  return moment.utc(moment.duration(minutes, `minutes`).asMilliseconds()).format(`HH:mm`);
};

export const formatDate = (date) => {
  const h = castTimeFormat(date.getHours());
  const m = castTimeFormat(date.getMinutes());

  return `${h}:${m}`;
};

const firstLetterToUpperCase = (word) => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

export const typeWithPretext = (type) => {
  if (type.type === `transfer`) {
    return `${firstLetterToUpperCase(type.name)} to`;
  }
  return `${firstLetterToUpperCase(type.name)} in`;
};
