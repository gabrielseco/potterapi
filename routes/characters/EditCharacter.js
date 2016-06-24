import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { FloatingButton, Table, Loading } from '../../components/UI'
import CharactersModel from '../../transport/index';
import RenderForm from './renderForm'




export default class EditCharacter extends Component {
  constructor(props) {
    super(props);
    this.model = new CharactersModel();
    this.state = {character: []};
  }
  componentDidMount(){
    const character = this.model.getOne(this.props.params.id);
    character.then(res => {
      console.log('res',res);
      this.setState({character: res});
    });
  }

  render() {
    const {character} = this.state;

    if(character.length === 0){
      return (<Loading/>)
    }
    return (
      <div>
        <RenderForm {...this.props} data={character}/>
      </div>
    );

  }
}
