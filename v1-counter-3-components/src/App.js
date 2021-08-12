import { $ } from './utils/util.js';
import Component from './core/Component.js';

import Counter from './components/Counter.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.setState({
      count: 0,
      diff: 1,
    });
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease } = this;

    new Counter($('.counter'), {
      count: this.state && this.state.count,
      onIncrease: handleIncrease.bind(this),
      onDecrease: handleDecrease.bind(this),
    });
  }

  template() {
    return `
      <h1>Counter</h1>
      <section class="diff-form"></section>
      <section class="counter"></section>
    `;
    // return `
    //   <div class="container">
    //     <h1>Counter</h1>
    //     <form class="setDiffForm">
    //       <input class="diffInput" type="number" placeholder="1" value="${this.state.diff || 1}"/>
    //       <button class="diffSubmit" type="submit">diff 설정</button>
    //     </form>
    //     <h2 class="counter">${this.state.count}</h2>
    //     <button class="increaseBtn">+1</button>
    //     <button class="decreaseBtn">-1</button>
    //   </div>
    // `;
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
