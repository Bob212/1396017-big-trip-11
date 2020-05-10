import AbstractComponent from "./abstract-component.js";

const createDaysUl = () => {
  return `
    <ul class="trip-days"></ul>
  `;
};

export default class DaysUl extends AbstractComponent {
  getTemplate() {
    return createDaysUl();
  }
}
