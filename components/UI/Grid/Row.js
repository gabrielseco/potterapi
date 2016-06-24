import React, { Component, PropTypes } from 'react';


class Row extends Component {

  render() {
    return (
      <div className='row'>
        {this.props.children}
      </div>
    );
  }

}

Row.defaultProps = {
}

Row.propTypes = {
}

export default Row
