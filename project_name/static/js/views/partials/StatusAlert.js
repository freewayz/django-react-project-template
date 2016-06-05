import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { dismissAuthStatus } from '../../actions';

class StatusAlert extends React.Component {
  render() {
    const { status, statusType } = this.props;

    const alertClass = classNames({
      'alert': true,
      'fade': true,
      'in': true,
      'alert-dismissible': true,
      [`alert-${statusType}`]: true,
    });

    return (
      <div>
        {
          status ?
            <div className={alertClass}>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                onClick={this.props.dismissStatus}
              >×</button>
              {status}
            </div> :
          null
        }
      </div>
    );
  }
}

StatusAlert.propTypes = {
  status: React.PropTypes.string.isRequired,
  statusType: React.PropTypes.string.isRequired,
  dismissStatus: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    statusType: state.auth.statusType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dismissStatus: () => dispatch(dismissAuthStatus()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusAlert);
