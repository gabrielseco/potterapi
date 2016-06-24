import React, { Component, PropTypes } from 'react';


class Button extends Component {
  render() {
    const classes = 'waves-effect waves-light btn '+ this.props.customClasses;
    return (
      <button className={classes} type={this.props.type} onClick={this.props.onClick}>{this.props.children}</button>
    );
  }

}

Button.defaultProps = {
  customClasses: '',
  type: ''
}

Button.propTypes = {
  customClasses: React.PropTypes.string,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Button
