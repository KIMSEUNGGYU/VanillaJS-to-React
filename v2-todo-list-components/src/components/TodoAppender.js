import { $ } from '../utils/util.js';

import Component from '../core/Component.js';
import store from '../store.js';
import { addTodoItem } from '../modules/todoList.js';

let id = 4;
export default class TodoAppender extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    return `
      <form type="submit">
        <input type="text" placeholder="할 일을 입력하세요." />
        <button type="submit">등록</button>
      </form>
    `;
  }
  componentDidMount() {
    $('form').addEventListener('submit', this.handleSubmit);
  }

  // custom
  handleSubmit = (event) => {
    event.preventDefault();

    const text = $('input')?.value;
    if (!text) return;

    store.dispatch(
      addTodoItem({
        id: id++,
        text,
        done: false,
      }),
    );

    $('input').focus();
  };
}
