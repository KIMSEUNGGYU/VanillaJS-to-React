import { $ } from './utils/util.js';

import store from './store.js';

import Component from './core/Component.js';
import { addTodoItem } from './modules/todoList.js';

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
    const todoList = store.getState();

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
      <div class="buttonGroups">
      <button class="allView">${FILTER['allView']}</button>
      <button class="activeView" style="color: blue">${FILTER['activeView']}</button>
      <button class="inactiveView" style="color: red">${FILTER['inactiveView']}</button>
    </div>
    `;
  }

  componentDidMount() {
    $('.todoInputForm').addEventListener('submit', this.handleTodoItem);
  }

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
}
