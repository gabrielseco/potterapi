import React, { Component, PropTypes } from 'react';


class FloatingButton extends Component {
  render() {
    const  classes = 'btn-floating btn-large waves-effect waves-light ' + this.props.customClasses
    const icon = this.props.icon === true ?  (<i className="material-icons">{this.props.children}</i>) : null
    const button = this.props.to !==  '' ? (<a href={this.props.to} className={classes}>{icon}</a>)
                                            : (<button className={classes}>{icon}</button>)

    return (
      <div>
      {button}
      </div>
    );
  }

}

FloatingButton.defaultProps = {
  customClasses: '',
  icon: true,
  to: '',
  children: 'add'
}

FloatingButton.propTypes = {
  customClasses: React.PropTypes.string,
  icon: React.PropTypes.bool,
  to: React.PropTypes.string

}

export default FloatingButton
