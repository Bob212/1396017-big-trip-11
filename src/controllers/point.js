import PointTemplate from '../components/point.js';
import FormTemplate from '../components/point-edit.js';
import {render, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;


    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscDown = this._onEscDown.bind(this);
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    const containerElement = this._container;

    this._pointComponent = new PointTemplate(point);
    this._pointEditComponent = new FormTemplate(point);

    // event for opening button
    this._pointComponent.setOpenButtonClickHandler(() => {
      this._replacePointElement();
      document.addEventListener(`keydown`, this._onEscDown);
    });

    // event for closing button
    this._pointEditComponent.setCloseButtonClickHandler(() => {
      this._replaceEditPointElement();
    });

    // event add to favorites
    this._pointEditComponent.setFavoritesButtonHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    if (oldPointComponent && oldPointEditComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(containerElement, this._pointComponent);
    }
  }

  _replacePointElement() {
    this._onViewChange();
    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditPointElement() {
    document.removeEventListener(`keydown`, this._onEscDown);

    this._pointEditComponent.reset();

    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscDown(evt) {
    const isKeyEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isKeyEsc) {
      this._replaceEditPointElement();
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditPointElement();
    }
  }
}
