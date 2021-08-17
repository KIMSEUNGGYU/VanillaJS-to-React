import { $ } from './utils/util.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.initialState();
  }

  async initialState() {
    this.setState({
      count: 0,
      diff: 1,
    });
  }

  template() {
    return `
      <div class="container">
        <h1>Counter</h1>
        <form class="setDiffForm">
          <input class="diffInput" type="number" placeholder="1" value="${this.state.diff || 1}"/>
          <button class="diffSubmit" type="submit">diff 설정</button>
        </form> 
        <h2 class="counter">${this.state.count}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease, handleSubmit } = this;
    $('.increaseBtn').addEventListener('click', handleIncrease.bind(this));
    $('.decreaseBtn').addEventListener('click', handleDecrease.bind(this));
    $('.setDiffForm').addEventListener('submit', handleSubmit.bind(this));
  }

  // custom handler
  handleIncrease() {
    this.setState({
      ...this.state,
      count: this.state.count + this.state.diff,
    });
  }
  handleDecrease() {
    this.setState({
      ...this.state,
      count: this.state.count - this.state.diff,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const diff = parseInt($('.diffInput').value, 10);
    this.setState({
      ...this.state,
      diff: diff,
    });
  }
}
