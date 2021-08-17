import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

export default class Counter extends Component {
  constructor(...rest) {
    super(...rest);
  }

  componentDidMount() {
    const { onIncrease, onDecrease } = this.props;

    $('.increaseBtn').addEventListener('click', onIncrease);
    $('.decreaseBtn').addEventListener('click', onDecrease);
  }

  template() {
    const { count } = this.props;

    return `
      <h2 class="counter">${count}</h2>
      <button class="increaseBtn">+1</button>
      <button class="decreaseBtn">-1</button>
    `;
  }
}
