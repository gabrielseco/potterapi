import React, { Component, PropTypes } from 'react';


class Form extends Component {

  render() {
    return (
      <form class={this.props.customClasses} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }

}

Form.defaultProps = {
  customClasses: React.PropTypes.string,
  onSubmit:function(){}
}

Form.propTypes = {
  customClasses: React.PropTypes.string,
  onSubmit: React.PropTypes.func,

}

export default Form
