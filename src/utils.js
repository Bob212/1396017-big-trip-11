const castTimeFormat = (number) => {
  return number < 10 ? `0${number}` : String(number);
};

export const formatMinutes = (minutes) => {
  let m = castTimeFormat(minutes % 60);
  let h = (minutes - m) / 60;

  h = h ? `${h}h ` : ``;
  m = m === `00` ? `` : `${m}m`;

  return `${h}${m}`
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

export const createElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.innerHTML = template;

  return divElement.children[0];
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
