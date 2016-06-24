import React, { Component, PropTypes } from 'react';
import Nav from '../UI/Nav/Nav'
import {Link} from 'react-router'
class Header extends Component {

  render() {
    return (
      <Nav barColour='deep-purple darken-3' >
        <a href="/" className="brand-logo">PotterAPI</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="characters">CHARACTERS</Link></li>
          <li><Link to="potions">POTIONS</Link></li>
          <li><Link to="stadistics">STADISTICS</Link></li>
        </ul>
      </Nav>
    );
  }

}

export default Header;
