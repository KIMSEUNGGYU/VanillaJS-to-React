import { $ } from '../utils/util.js';
import { FILTER } from '../constant.js';

import Component from '../core/Component.js';

export default class TodoFilter extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    return `
      <button class="allView" data-filter-type="allView">${FILTER['allView']}</button>
      <button class="activeView" style="color: blue" data-filter-type="activeView">${FILTER['activeView']}</button>
      <button class="inactiveView" style="color: red" data-filter-type="inactiveView">${FILTER['inactiveView']}</button>
    `;
  }

  componentDidMount() {
    // const { onSetFilter } = this.props;
    this.$target.addEventListener('click', this.handleFilterButtonClick);
    // console.log(this.$target);
    // console.log(onSetFilter);
  }

  // custom
  handleFilterButtonClick = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const { onSetFilter } = this.props;

    const filterType = target?.dataset['filterType'];
    onSetFilter(filterType);

    // console.log(target, filterType);
  };
}
