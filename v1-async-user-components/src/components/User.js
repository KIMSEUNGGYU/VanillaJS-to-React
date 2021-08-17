import Component from '../core/Component.js';

export default class User extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { user } = this.props;

    if (!user) return ``;

    return `
    <section class="user">
      <h1>${user.username}</h1>
      <b>Email:</b> ${user.email}
    </section>
    `;
  }

  componentDidMount() {}
}
