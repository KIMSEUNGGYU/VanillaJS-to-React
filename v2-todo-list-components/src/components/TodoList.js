import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

import store from '../store.js';
import { toggleTodoItem, deleteTodoItem } from '../modules/todoList.js';

export default class TodoList extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    let { todoList, filter } = store.getState();
    todoList = this._handleFilteredTodoList(todoList, filter);

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
    $('.list').addEventListener('click', this.handleToggleAndDeleteItem);
  }

  // custom
  handleToggleAndDeleteItem({ target }) {
    if (target.nodeName !== 'BUTTON') return;

    const id = target.closest('li')?.dataset.id;
    if (!id) return; // 방어 코드

    if (target.classList.contains('deleteBtn')) {
      store.dispatch(deleteTodoItem(+id));
      return;
    }

    if (target.classList.contains('toggleBtn')) {
      store.dispatch(toggleTodoItem(+id));
      return;
    }
  }

  _handleFilteredTodoList(todoList, filter) {
    if (filter === 'allView') return todoList;

    return todoList.filter((todoItem) =>
      filter === 'activeView' ? !todoItem.done : !!todoItem.done,
    );
  }
}
