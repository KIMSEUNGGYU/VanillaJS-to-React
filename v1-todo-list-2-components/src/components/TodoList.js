import { $ } from '../utils/util.js';
import { FILTER } from '../constant.js';

import Component from '../core/Component.js';

export default class TodoList extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const todoList = this.handleGetTodoListByFilter();

    return `
    <ul class="list">
      ${todoList
        .map(
          (todoItem) => `
            <li data-id=${todoItem.id}>
              <span style="text-decoration: ${todoItem.done ? 'line-through' : 'none'}">
                ${todoItem.text}
              </span>
              <button class="deleteBtn">삭제</button>
              <button class="toggleBtn" style="color: ${todoItem.done ? 'red' : 'blue'}">
                ${todoItem.done ? '비활성' : '활성'}
              </button>
            </li>
          `,
        )
        .join('')}
    </ul>
      `;
  }

  componentDidMount() {
    const { handleTodoListClick } = this;

    $('.list').addEventListener('click', handleTodoListClick.bind(this));
  }

  // custom
  handleTodoListClick({ target }) {
    const { onToggleTodoItem, onRemoveTodoItem } = this.props;

    if (target.nodeName !== 'BUTTON') return;

    const id = target.closest('li')?.dataset['id'];

    if (target.classList.contains('toggleBtn')) {
      onToggleTodoItem(+id);
      return;
    }

    if (target.classList.contains('deleteBtn')) {
      onRemoveTodoItem(+id);
      return;
    }
  }

  handleGetTodoListByFilter() {
    const { todoList, filter } = this.props;

    if (filter === 'allView') return todoList;
    return todoList.filter((todoItem) =>
      filter === 'activeView' ? !todoItem.done : !!todoItem.done,
    );
  }
}
