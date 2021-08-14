import { $ } from './utils/util.js';
import Component from './core/Component.js';

import Counter from './components/Counter.js';
import DiffInput from './components/DiffInput.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.setState({
      count: 0,
      diff: 1,
    });
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease, handleSetDiff } = this;

    new Counter($('.counter-component'), {
      count: this.state && this.state.count,
      onIncrease: handleIncrease.bind(this),
      onDecrease: handleDecrease.bind(this),
    });

    new DiffInput($('.diff-form-component'), {
      diff: this.state && this.state.diff,
      onSetDiff: handleSetDiff.bind(this),
    });
  }

  template() {
    return `
      <h1>Counter</h1>
      <section class="diff-form-component"></section>
      <section class="counter-component"></section>
    `;
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

  handleSubmit() {
    const diff = parseInt($('.diffInput').value, 10);
    this.setState({
      ...this.state,
      diff: diff,
    });
  }

  handleSetDiff(diff) {
    this.setState({
      ...this.state,
      diff,
    });
  }
}
