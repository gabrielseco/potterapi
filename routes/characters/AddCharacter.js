import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Row } from '../../components/UI';
import { giveIDFromForm, toObject, getURL, extractDate, formatForGraphQL} from '../../functions';
import axios from 'axios';
import CharactersModel from '../../transport/index';


class AddCharacter extends Component {
  constructor(props){
    super(props);
    this.model = new CharactersModel();

    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      data: {

      }
    }
  }

  componentDidMount(){
    const characters = this.model.getAll();
    characters.then(res => {
      console.log('res',res);
    })
  }

  handleDate(){
    $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  handleForm(e){
    e.preventDefault();
    let children = this.refs.form.props.children;
    let obj = giveIDFromForm(children);

    console.log('obj',obj);

    let temp = obj['occupations'];
        temp = temp.split(",");
    let tempWands = obj['wands'];
    if(tempWands !== "" || tempWands !== undefined){
      tempWands = tempWands.split("|");

    }



    let arrOcuppations = [];
    let arrWands = [];

    tempWands.map(item => {
      if(item!== ""){
        var fields = item.split(",");
        const obj = {
          dimension: fields[0].trim(),
          tree: fields[1].trim(),
          magical_creature:fields[2].trim()
        }
        arrWands.push(obj);
      }

    });

    console.log('arrWands',arrWands)
    if(obj.wands.length > 0){
      obj['wands'] = arrWands;
    }
    else {
      delete obj['wands'];
    }


    temp.map(item => {
      const obj = {
        name: item.trim()
      };
      arrOcuppations.push(obj);
    });


    if(obj.occupations.length > 0){
      obj['occupations'] = arrOcuppations;
    }
    else {
      delete obj['occupations'];
    }

    console.log('obj to add',obj)

    const string = formatForGraphQL(obj);
    console.log('string',string)

    this.model.addCharacter(string , res => {
      console.log('res',res);
    });



  }

  handleResponse(json){
    console.log('json',json)
  }

  handleSearch(){
    const query = this.search.state.value;

    axios.get(getURL() + 'getCharacter?query='+query).then(res => {
      res = res.data;
      console.log('res',res);
      let arr = extractDate(res['born']);
      if(arr !== null){
        res['birth_date'] = arr[0];
        res['birth_address'] = arr[1];
      }


      this.setState({
        data:res
      });
    });

  }

  renderForm(data){
    if(Object.keys(data).length !== 0){
      return (
        <Form ref='form' customClasses="col s12" onSubmit={this.handleForm.bind(this)}>
        born: {JSON.stringify(this.state.data.born)}

          <Row>
            <FormGroup id='name' label="NAME" type='text' customClasses="col s6" defaultValue={data.name}/>
            <FormGroup id='full_name' label="FULL NAME" type='text' customClasses="col s6" defaultValue={data.full_name}/>
          </Row>

          <Row>
            <FormGroup id='birth_date' label="Birth Date" type='text' customClasses="col s6" handleDate={this.handleDate} defaultValue={data.birth_date}/>
            <FormGroup id='birth_address' label="Birth address" type='text' customClasses="col s6" defaultValue={data.birth_address}/>

          </Row>
          <Row>
            <FormGroup id='death_date' label="Date of death" type='text' customClasses="col s6" defaultValue={data.died} />
            <FormGroup id='death_address' label="Death address" type='text' customClasses="col s6" defaultValue={data.death_address}/>

          </Row>
          <Row>
            <FormGroup id='known_as' label="Known as" type='text' customClasses="col s6" defaultValue={data.also_known_as}/>
            <FormGroup id='hair_colour' label="Hair colour" type='text' customClasses="col s6" defaultValue={data.hair_colour}/>
          </Row>
          <Row>
            <FormGroup id='eye_colour' label="Eye colour" type='text' customClasses="col s6" defaultValue={data.eye_colour}/>
            <FormGroup id='skin_colour' label="Skin colour" type='text' customClasses="col s6" defaultValue={data.skin_colour}/>
          </Row>
          <Row>
            <FormGroup id='boggart' label="Boggart" type='text' customClasses="col s6" defaultValue={data.boggart}/>
            <FormGroup id='patronus' label="Patronus" type='text' customClasses="col s6" defaultValue={data.patronus}/>
          </Row>
          <Row>
            <FormGroup id='occupations' label="Occupation" type='text' customClasses="col s6" defaultValue={data.occupation}/>
            <FormGroup id='house' label="House" type='text' customClasses="col s6" defaultValue={data.house}/>
          </Row>
          <Row>
            <FormGroup id='wands' label="Wands" type='text' customClasses="col s6" defaultValue={data.wand}/>
            <FormGroup id='gender' label="Gender" type='text' customClasses="col s6" defaultValue={data.gender}/>
          </Row>
          <Row>
            <FormGroup id='blood_status' label="Magic Blood" type='text' customClasses="col s6" defaultValue={data.blood_status}/>
            <FormGroup id='marital_status' label="Marital Status" type='text' customClasses="col s6" defaultValue={data.marital_status}/>
          </Row>
          <Row>
            <FormGroup id='actor' label="Actor" type='text' customClasses="col s6"/>
          </Row>
          <Row>
            <div className='col s6 offset-s9'>
            <Button customClasses='' type='submit'>SEND INFO</Button>
            </div>
          </Row>
        </Form>
      )
    }
    return null;

  }

  render() {
    let {data} = this.state;

      return (
        <div>
        <FormGroup ref={i => this.search = i} label="NAME" type='text' customClasses="col s6"/>
        <Button customClasses='' type='button' onClick={this.handleSearch}>SEARCH INFO</Button>
        <br/>
        {this.renderForm(data)}


        </div>
      );
    }

}

AddCharacter.defaultProps = {
}

AddCharacter.propTypes = {
}

export default AddCharacter
