import { $ } from './utils/util.js';

import store from './store.js';

import Component from './core/Component.js';
import { addTodoItem, changeFilter, deleteTodoItem, toggleTodoItem } from './modules/todoList.js';

const FILTER = Object.freeze({
  allView: '전체보기',
  activeView: '활성보기',
  inactiveView: '비활성보기',
});

let nextId = 4;
export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    let { todoList, filter } = store.getState();
    todoList = this._handleFilteredTodoList(todoList, filter);

    return `
      <h1>TODO-LIST</h1>
      <form class="todoInputForm">
        <input class="todoInput" type="text" placeholder="할 일을 입력하세요." />
        <button class="addTodoBtn" type="submit">등록</button>
      </form>
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
      <div class="filter-group">
        <button class="allView">${FILTER['allView']}</button>
        <button class="activeView" style="color: blue">${FILTER['activeView']}</button>
        <button class="inactiveView" style="color: red">${FILTER['inactiveView']}</button>
      </div>  
    `;
  }

  componentDidMount() {
    $('.todoInputForm').addEventListener('submit', this.handleTodoItem);
    $('.list').addEventListener('click', this.handleToggleAndDeleteItem);
    $('.filter-group').addEventListener('click', this.handleFilterClick);
  }

  // custom
  handleTodoItem(event) {
    event.preventDefault();

    const todoText = $('.todoInput')?.value;
    if (!todoText) return;

    store.dispatch(
      addTodoItem({
        id: nextId++,
        text: todoText,
        done: false,
      }),
    );
    $('.todoInput')?.focus();
  }

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

  handleFilterClick = ({ target }) => {
    if (target.nodeName !== 'BUTTON') return;

    const filter = target.className;
    if (!filter) return;

    store.dispatch(changeFilter(filter));
  };

  _handleFilteredTodoList(todoList, filter) {
    if (filter === 'allView') return todoList;

    return todoList.filter((todoItem) =>
      filter === 'activeView' ? !todoItem.done : !!todoItem.done,
    );
  }
}
