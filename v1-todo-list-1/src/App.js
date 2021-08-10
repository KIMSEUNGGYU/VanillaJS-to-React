import { $ } from './utils/util.js';
import { initialState } from './data/data.js';

import Component from './components/Component.js';

const FILTER = Object.freeze({
  allView: '전체보기',
  activeView: '활성보기',
  inactiveView: '비활성보기',
});

let id = 4;
export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.setState({
      todoList: initialState,
      filter: 'allView',
    });
  }

  componentDidMount() {
    const { handleAddTodoItem, handleTodoClick, handleFilterClick } = this;
    $('.todoInputForm').addEventListener('submit', handleAddTodoItem);
    $('.list').addEventListener('click', handleTodoClick);
    $('.buttonGroups').addEventListener('click', handleFilterClick);
  }

  template() {
    let { todoList, filter } = this.state;

    todoList = this.handleFilteredTodoList(todoList, filter);

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

  // custom
  handleAddTodoItem = (event) => {
    event.preventDefault();

    const text = $('.todoInput').value;
    if (!text) return; // 방어 코드 (입력 없으면 아무동작 안함)

    const todoItem = {
      id: id++,
      text,
      done: false,
    };

    const { state } = this;
    this.setState({
      ...state,
      todoList: state.todoList.concat(todoItem),
    });

    $('.todoInput').focus();
  };

  handleToggleTodoItem = (id) => {
    const { state } = this;
    this.setState({
      ...state,
      todoList: state.todoList.map((todoItem) =>
        todoItem.id === +id
          ? {
              ...todoItem,
              done: !todoItem.done,
            }
          : todoItem,
      ),
    });
  };

  handleRemoveTodoItem = (id) => {
    const { state } = this;
    this.setState({
      ...state,
      todoList: state.todoList.filter((todoItem) => todoItem.id !== +id),
    });
  };

  handleTodoClick = ({ target }) => {
    if (target.nodeName !== 'BUTTON') return;

    const id = target.closest('li')?.dataset.id;
    if (!id) return; // 방어 코드

    if (target.classList.contains('deleteBtn')) {
      this.handleRemoveTodoItem(id);
      return;
    }

    if (target.classList.contains('toggleBtn')) {
      this.handleToggleTodoItem(id);
      return;
    }
  };

  handleFilterClick = ({ target }) => {
    if (target.nodeName !== 'BUTTON') return;

    const filter = target.className;
    if (!filter) return;

    this.setState({
      ...this.state,
      filter,
    });
  };

  handleFilteredTodoList = (todoList, filter) => {
    if (filter === 'allView') return todoList;

    return todoList.filter((todoItem) =>
      filter === 'activeView' ? !todoItem.done : !!todoItem.done,
    );
  };
}
