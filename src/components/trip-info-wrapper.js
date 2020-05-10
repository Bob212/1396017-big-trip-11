import AbstractComponent from "./abstract-component.js";

const createTripInfoWrapperTemplate = () => {
  return `
    <section class="trip-main__trip-info trip-info"></section>
  `;
};

export default class TripInfoWrapper extends AbstractComponent {
  getTemplate() {
    return createTripInfoWrapperTemplate();
  }
}
