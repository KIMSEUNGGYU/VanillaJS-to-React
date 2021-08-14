export default class Component {
  state;
  props;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
  }
  setState(newState) {
    this.state = newState;
    this.render();
    console.log("setState", this.state)
  }
  template() {
    return ``;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }
  componentDidMount() {
    // 이벤트 등록
  }
}
