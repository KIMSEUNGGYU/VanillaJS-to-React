export default class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  async initialState() {
    // 초기 state 초기화 영역
    this.render();
  }

  template() {
    // JSX 와 같이 해당 컴포넌트의 UI 를 정의하는 부분
    return ``;
  }

  render() {
    // 실제 브라우저에 뿌려주는 기능
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  componentDidMount() {
    // 이벤트 등록 및 관련(하위) 컴포넌트 생성?
  }
}
