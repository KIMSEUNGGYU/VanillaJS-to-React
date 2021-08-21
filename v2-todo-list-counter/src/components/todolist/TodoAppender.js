import Component from '../../core/Component.js';
import { $ } from '../../utils/util.js';

import { todoListStore } from '../../store.js';
import { addTodoItem } from '../../modules/todoList.js';

let id = 4;
export default class TodoAppender extends Component {
  template() {
    return `
    <form type="submit">
      <input class="todoInput" type="text" placeholder="할 일을 입력하세요." />
      <button class="addTodoBtn" type="submit">등록</button>
    </form>
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('submit', this.handleAddTodoItem.bind(this));
  }

  handleAddTodoItem(event) {
    event.preventDefault();

    const text = $('.todoInput')?.value;
    if (!text) return;

    todoListStore.dispatch(
      addTodoItem({
        id: id++,
        text,
        done: false,
      }),
    );

    $('.todoInput')?.focus();
  }
}
