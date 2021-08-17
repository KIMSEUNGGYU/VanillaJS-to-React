import { FILTER } from '../constant.js';

import Component from '../core/Component.js';
import store from '../store.js';
import { changeFilter } from '../modules/todoList.js';

export default class TodoFilter extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    return `
      <button class="allView" data-filter-type="allView">${FILTER['allView']}</button>
      <button class="activeView" style="color: blue" data-filter-type="activeView">${FILTER['activeView']}</button>
      <button class="inactiveView" style="color: red" data-filter-type="inactiveView">${FILTER['inactiveView']}</button>
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', this.handleFilterButtonClick);
  }

  // custom
  handleFilterButtonClick = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const filter = target?.dataset['filterType'];
    store.dispatch(changeFilter(filter));
  };
}
