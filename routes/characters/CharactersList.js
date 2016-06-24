import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { FloatingButton, Table, Loading } from '../../components/UI'
import CharactersModel from '../../transport/index';




export default class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.model = new CharactersModel();
    this.state = {characters: []}
  }
  componentDidMount(){
    const characters = this.model.getAll();
    characters.then(res => {
      console.log('res',res)
      this.setState({characters: res});
    });
  }
  render() {

    const {characters} = this.state;

    if(characters.length === 0){
      return (<Loading/>)
    }

    return (
      <div>
        <br/>
        <FloatingButton to="add_character"/>
        <Table data={characters} browserHistory={browserHistory}/>
      </div>
    );

  }
}
