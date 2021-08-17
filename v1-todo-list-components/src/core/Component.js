export default class Component {
  $target;
  state;
  props;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  async initialState() {
    // 초기 state 초기화 영역
    // 기존에는 constructor 에서 처리하고자 했으나, constructor 에서 비동기를 따로 처리해야 하므로 
    // 해당 메소드 생성
    this.render();
  }

  setState(newState) {
    // 컴포넌트의 상태를 변경하는 기능
    this.state = newState;
    this.render();
    console.log('setState', this.state);
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
