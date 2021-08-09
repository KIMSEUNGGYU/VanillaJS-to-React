export default class Component {
  state;
  props;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
  }
  template() {
    return ``;
  }
  setState(newState) {
    this.state = newState;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }
  componentDidMount() {
    // 이벤트 등록
  }
}
