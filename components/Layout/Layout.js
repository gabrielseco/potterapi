import React, { Component, PropTypes } from 'react';
import Header from './Header';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <Header />
        <main>
          <div>
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }

}

export default Layout;
