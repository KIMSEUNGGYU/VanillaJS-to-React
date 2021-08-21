import { $ } from './utils/util.js';
import Component from './core/Component.js';

import { Counter, InputDiff, TodoAppender, TodoList, TodoFilter } from './components/index.js';

import { countStore, todoListStore } from './store.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <h1>Counter</h1>
      <section class="diff-form-component"></section>
      <section class="counter-component"></section>
      <hr />
      <h1>TodoList</h1>
      <section class="todo-appender"></section>
      <section class="todo-list"></section>
      <section class="filter-group"></section>
    `;
  }

  componentDidMount() {
    const inputDiff = new InputDiff($('.diff-form-component'));
    const counter = new Counter($('.counter-component'));

    const todoAppender = new TodoAppender($('.todo-appender'));
    const todoList = new TodoList($('.todo-list'));
    const todoFilter = new TodoFilter($('.filter-group'));

    countStore.subscribe(() => {
      inputDiff.render(), counter.render();
    });

    todoListStore.subscribe(() => {
      todoAppender.render(), todoList.render(), todoFilter.render();
    });
  }
}
