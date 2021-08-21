import { $ } from '../utils/util.js';

import Component from '../core/Component.js';

let id = 4;
export default class TodoAppender extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <form type="submit">
        <input class="todoInput" type="text" placeholder="할 일을 입력하세요." />
        <button class="addTodoBtn" type="submit">등록</button>
      </form>
    `;
  }

  componentDidMount() {
    $('form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  // custom
  handleSubmit(event) {
    event.preventDefault();
    const { onAddTodoItem } = this.props;

    const text = $('input')?.value;
    if (!text) return;

    onAddTodoItem({
      id: id++,
      text,
      done: false,
    });
    $('input').focus();
  }
}
