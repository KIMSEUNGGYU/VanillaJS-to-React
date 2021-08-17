/**
 * 옵저버 패턴!
 * observe 관리 하는 곳
 */

export default class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers = this.observers.concat(observer);

    // 최초로 구독하면 해당 컴포넌트 최초 render 기능 동착
    observer(); // 주어진 observe 함수, 해당 컴포넌트 render 함수 (초기에 수행시키기 위해 해당 코드에서 observer 호출)
  }

  publish() {
    this.observers.forEach((cb) => cb());
    console.log('change state', this?._state);
  }
}
