import { $ } from './utils/util.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.setState(0);
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease } = this;
    $('.increaseBtn').addEventListener('click', handleIncrease.bind(this));
    $('.decreaseBtn').addEventListener('click', handleDecrease.bind(this));
  }
  template() {
    return `
        <div class="container">
        <h1>Counter</h1>
        <!-- <form class="setDiffForm">
        <input type="text" placeholder="1" />
        <button type="submit">diff 설정</button>
        </form> -->
        <h2 class="counter">${this.state}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
  }

  // custom handler
  handleIncrease() {
    this.setState(this.state + 1);
  }
  handleDecrease() {
    this.setState(this.state - 1);
  }
}
