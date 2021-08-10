import { $ } from './utils/util.js';

import Component from './components/Component.js';

const initialState = [
  {
    id: 1,
    text: '컴포넌트 개발',
    done: true,
  },
  {
    id: 2,
    text: '리액트 흉내내기',
    done: false,
  },
  {
    id: 3,
    text: 'TDD 해보기',
    done: false,
  },
];

let id = 4;
export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.setState({
      todoList: initialState,
    });
  }

  componentDidMount() {
    const { handleAddTodoItem, handleTodoClick } = this;
    $('.todoInputForm').addEventListener('submit', handleAddTodoItem);
    $('.list').addEventListener('click', handleTodoClick);
  }

  template() {
    const { todoList } = this.state;

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
          <span style="text-decoration: ${todoItem.done ? 'line-through' : 'none'}">${
            todoItem.text
          }</span>
          <button class="deleteBtn">삭제</button>
          <button class="toggleBtn" style="color: ${todoItem.done ? 'red' : 'blue'}">${
            todoItem.done ? '비활성' : '활성'
          }</button>
        </li>
      `,
        )
        .join('')}
    </ul>
    <div class="buttonGroups">
      <button>전체보기</button>
      <button>활성보기</button>
      <button>비활성 보기</button>
    </div>
    `;
  }

  // custom
  handleAddTodoItem = (event) => {
    event.preventDefault();
    const text = $('.todoInput').value;

    const todoItem = {
      id: id++,
      text,
      done: false,
    };
    // console.log('Test', todoItem);

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

    if (target.className === 'deleteBtn') {
      this.handleRemoveTodoItem(id);
      return;
    }

    if (target.className === 'toggleBtn') {
      this.handleToggleTodoItem(id);
      return;
    }
  };
}
