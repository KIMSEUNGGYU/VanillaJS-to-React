export default class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
  }
  // setState 함수는 redux 로 관리할 때는 사용 하면 안됨 , store 로 관리
  // setState(newState) {
  //   this.state = newState;
  //   this.render();
  //   console.log('setState', this.state);
  // }
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
