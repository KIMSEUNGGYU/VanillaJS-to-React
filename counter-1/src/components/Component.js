export default class Component {
  state;
  props;
  constructor($target, props) {
    // console.log("components", $target, props);
    this.$target = $target;
    this.props = props;
  }
  setState(newState) {
    this.state = newState;
    this.render();
    console.log(this.state, 'setState');
  }
  componentDidMount() {
    // 이벤트 등록
  }

  template() {
    return ``;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }
}
