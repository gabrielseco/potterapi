import React, { Component, PropTypes } from 'react';


class Nav extends Component {

  render() {
    var classes = 'nav-wrapper ' + this.props.barColour
    return (
      <nav>
        <div className={classes}>
          {this.props.children}
        </div>
      </nav>
    );
  }

}

Nav.defaultProps = {
  barColour: 'deep-purple darken-3'
}

Nav.propTypes = {
  barColour: React.PropTypes.string,
}

export default Nav
