import { $ } from './utils/util.js';
import Component from './core/Component.js';
import { initialState } from './data/data.js';

import TodoAppender from './components/TodoAppender.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    this.initialState();
  }

  initialState() {
    this.setState({
      todoList: initialState,
      filter: 'allView',
    });
  }

  template() {
    return `
      <h1>TODO-LIST</h1>
      <div class="todo-appender"></div>
      <div class="todo-list"></div>
      <div class="filter-group"></div>
    `;
  }
  componentDidMount() {
    const { handleAddTodoItem, handleToggleTodoItem, handleRemoveTodoItem, handleSetFilter } = this;
    new TodoAppender($('.todo-appender'), {
      onAddTodoItem: handleAddTodoItem.bind(this),
    });
    new TodoList($('.todo-list'), {
      todoList: this.state.todoList,
      filter: this.state.filter,
      onToggleTodoItem: handleToggleTodoItem.bind(this),
      onRemoveTodoItem: handleRemoveTodoItem.bind(this),
    });
    new TodoFilter($('.filter-group'), {
      onSetFilter: handleSetFilter.bind(this),
    });
  }

  // custom
  handleAddTodoItem(todoItem) {
    this.setState({
      ...this.state,
      todoList: this.state.todoList.concat(todoItem),
    });
  }
  handleToggleTodoItem(id) {
    this.setState({
      ...this.state,
      todoList: this.state.todoList.map((todoItem) =>
        todoItem.id === id
          ? {
              ...todoItem,
              done: !todoItem.done,
            }
          : todoItem,
      ),
    });
  }
  handleRemoveTodoItem(id) {
    this.setState({
      ...this.state,
      todoList: this.state.todoList.filter((todoItem) => todoItem.id !== id),
    });
  }
  handleSetFilter(filter) {
    this.setState({
      ...this.state,
      filter,
    });
  }
}
