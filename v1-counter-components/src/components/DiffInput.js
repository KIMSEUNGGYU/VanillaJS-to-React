import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

export default class DiffInput extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  componentDidMount() {
    $('form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  template() {
    const { diff } = this.props;

    console.log('template', diff);
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
    const { onSetDiff } = this.props;

    const diff = $('input')?.value;
    onSetDiff(+diff);
  }
}
