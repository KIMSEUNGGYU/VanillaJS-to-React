import Component from '../../core/Component.js';

import { changeFilter } from '../../modules/todoList.js';
import { todoListStore } from '../../store.js';

export default class TodoFilter extends Component {
  template() {
    return `
      <button class="allView" style="color: blue" data-filter-type="allView">전체 보기</button>
      <button class="activeView" data-filter-type="activeView">활성 보기</button>
      <button class="inactiveView" style="color: red" data-filter-type="inactiveView">비활성 보기</button>
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', this.handleFilterButtonClick);
  }

  // custom
  handleFilterButtonClick({ target }) {
    if (target.tagName !== 'BUTTON') return;

    const filter = target?.dataset['filterType'];
    todoListStore.dispatch(changeFilter(filter));
  }
}
