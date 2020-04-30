import {POINT_TYPES, DESTINATION_LIST, AVAILABLE_OPTIONS} from '../const.js';
import {typeWithPretext} from '../utils.js';
import moment from 'moment';

const transferTypes = POINT_TYPES.filter((type) => type.type === `transfer`);
const activityTypes = POINT_TYPES.filter((type) => type.type === `activity`);

const createTypesTemplate = (types) => {
  return types.map((type) => {
    const {name} = type;

    return `
      <div class="event__type-item">
        <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}">
        <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${name}</label>
      </div>
    `;
  }).join(`\n`);
};

const createPossibleDestinations = (list) => {
  return list.map((destination) => {
    return `
      <option value="${destination}"></option>
    `;
  }).join(`\n`);
};

const createOffers = (currentOffers, typeName) => {
  const offersByType = AVAILABLE_OPTIONS[typeName] || [];

  return offersByType.map((offer, index) => {
    let isCurrentOfferSelected = currentOffers.findIndex((el) => {
      return el.title === offer.title;
    });

    isCurrentOfferSelected = isCurrentOfferSelected === -1 ? false : true;

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${index}" type="checkbox" name="event-offer-${offer.title}" ${isCurrentOfferSelected ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.title}-${index}">
          <span class="event__offer-title">${offer.title}</span>
          +
          €&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join(`\n`);
};

const createPhotos = (srcArray) => {
  return srcArray.map((src) => {
    return `
      <img class="event__photo" src="${src}" alt="Event photo">
    `;
  }).join(`\n`);
};

export const createFormTemplate = (point) => {
  const {
    type = POINT_TYPES[0],
    destination = ``,
    startDate = new Date(),
    endDate = new Date(),
    price = ``,
    offers = ``,
    isFavourite = false,
    description = false,
  } = point;

  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
      <ul class="trip-events__list">
        <li class="trip-events__item">
          <form class="event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${createTypesTemplate(transferTypes)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${createTypesTemplate(activityTypes)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${typeWithPretext(type)}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${createPossibleDestinations(DESTINATION_LIST)}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(startDate).format('DD/MM/YY HH:MM')}">
                —
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(endDate).format('DD/MM/YY HH:MM')}18/03/19 13:35">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  €
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>

              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavourite ? `checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            <section class="event__details">
              ${AVAILABLE_OPTIONS[type.name] ?
                `
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${createOffers(offers, type.name)}
                    </div>
                  </section>
                ` : ``}

              ${description && (description.title || description.img.length > 0) ?
                `
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description.title}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotos(description.img)}
                      </div>
                    </div>
                  </section>
                ` : ``}
            </section>
          </form>
        </li>
      </ul>
    </li>
  `;
};
