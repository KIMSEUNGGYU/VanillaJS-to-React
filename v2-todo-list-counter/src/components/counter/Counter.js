import Component from '../../core/Component.js';
import { $ } from '../../utils/util.js';

import { decrease, increase } from '../../modules/counter.js';
import { countStore } from '../../store.js';

export default class Counter extends Component {
  template() {
    const { number } = countStore.getState();

    return `
      <h2 class="counter">${number}</h2>
      <button class="increaseBtn">+1</button>
      <button class="decreaseBtn">-1</button>
    `;
  }

  componentDidMount() {
    $('.increaseBtn').addEventListener('click', () => countStore.dispatch(increase()));
    $('.decreaseBtn').addEventListener('click', () => countStore.dispatch(decrease()));
  }
}
