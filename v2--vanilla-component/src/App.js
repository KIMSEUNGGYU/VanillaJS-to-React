import { $ } from './utils/util.js';

import store from './store.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  template() {
    return ``;
  }

  componentDidMount() {}
}
