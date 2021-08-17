import { $ } from './utils/util.js';
import Component from './core/Component.js';
import store from './store.js';

import TodoAppender from './components/TodoAppender.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  template() {
    return `
      <h1>TodoList</h1>
      <div class="todo-appender"></div>
      <div class="todo-list"></div>
      <div class="filter-group"></div>
    `;
  }

  componentDidMount() {
    new TodoAppender($('.todo-appender'));
    new TodoList($('.todo-list'));
    new TodoFilter($('.filter-group'));
  }
}
