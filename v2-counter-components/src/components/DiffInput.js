import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

import { setDiff } from '../module/counter.js';
import store from '../store.js';

export default class DiffInput extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  componentDidMount() {
    $('form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  template() {
    const { diff } = store.getState();

    return `
      <form>
        <input class="diffInput" type="number" value="${diff}" />
        <button class="diffSubmit" type="submit">diff 설정</button>
      </form>
    `;
  }

  // custom
  handleSubmit(event) {
    event.preventDefault();

    const diff = $('input')?.value;
    if (!diff) return;

    store.dispatch(setDiff(+diff));
  }
}
