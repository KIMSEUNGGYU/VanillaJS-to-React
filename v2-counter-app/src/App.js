import { $ } from './utils/util.js';
import Component from './core/Component.js';
import store from './store.js';

import { decrease, increase, setDiff } from './modules/counter.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  template() {
    const { diff, number } = store.getState();

    return `
      <div class="container">
        <h1>Counter</h1>
        <form class="setDiffForm">
          <input class="diffInput" type="number" placeholder="1" value="${diff}"/>
          <button class="diffSubmit" type="submit">diff 설정</button>
        </form> 
        <h2 class="counter">${number}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
  }

  componentDidMount() {
    $('.increaseBtn').addEventListener('click', () => store.dispatch(increase()));
    $('.decreaseBtn').addEventListener('click', () => store.dispatch(decrease()));
    $('.setDiffForm').addEventListener('submit', this.handleChangeDiff);
  }

  handleChangeDiff(event) {
    event.preventDefault();

    const diff = $('.diffInput')?.value;
    if (!diff) return;

    store.dispatch(setDiff(+diff));
  }
}
