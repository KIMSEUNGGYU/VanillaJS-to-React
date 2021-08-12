import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

export default class Counter extends Component {
  constructor(...rest) {
    super(...rest);
    this.render(); // 해당 템플릿을 렌더링?
    // core 에서 하면 최상위 컴포넌트 App 도 되고 Diff 도 되고 ,..ㅠㅠ
    // this.setState();
  }

  componentDidMount() {
    // console.log('diffInput', 'ComponentDidMount', this.props);
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
