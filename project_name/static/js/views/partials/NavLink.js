import React from 'react';
import { Link } from 'react-router';

export default class NavLink extends React.Component {
  render() {
    const isActive = this.context.router.isActive(this.props.to, this.props.isIndex);
    const className = isActive ? 'active' : '';
    return (
      <li className={className}>
        <Link {...this.props}>{this.props.children}</Link>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

NavLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  isIndex: React.PropTypes.bool,
};
