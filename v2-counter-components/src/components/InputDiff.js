import { $ } from '../utils/util.js';
import Component from '../core/Component.js';
import store from '../store.js';

import { setDiff } from '../modules/counter.js';

export default class InputDiff extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { diff } = store.getState();

    return `
      <form class="setDiffForm">
        <input class="diffInput" type="number" value="${diff}" />
        <button class="diffSubmit" type="submit">diff 설정</button>
      </form>
    `;
  }

  componentDidMount() {
    $('.setDiffForm').addEventListener('click', this.handleChangeDiff);
  }

  handleChangeDiff(event) {
    event.preventDefault();

    const diff = $('.diffInput')?.value;
    if (!diff) return;

    store.dispatch(setDiff(+diff));
  }
}
