import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, Row } from '../../components/UI';
import { giveIDFromForm, toObject, getURL, extractDate, formatForGraphQL} from '../../functions';
import CharactersModel from '../../transport/index';


export default class RenderForm extends Component {
  constructor(props) {
    super(props);
    this.model = new CharactersModel();

  }
  handleForm(e){
    e.preventDefault();
    let children = this.refs.form.props.children;
    let obj = giveIDFromForm(children);
    console.log('obj',obj)
    let temp = obj['occupations'];
    let tempWands = obj['wands'];

    if(tempWands !== undefined){
      const arrWands = [];
      tempWands = tempWands.split("|");
      tempWands.map(item => {
        if(item!== ""){
          var fields = item.split(",");

          const obj = {
            dimension: fields[0],
            tree: fields[1],
            magical_creature:fields[2]
          }
          arrWands.push(obj);
        }

      })

      obj['wands'] = arrWands;
    } else {
      delete obj['wands']
    }
    if(temp !== undefined){
      console.log('temp',temp)
      const arrOcuppations = [];
      temp = temp.split(",");

      temp.map(item => {
        if(item !== ""){
          const obj = {
            name: item
          };
          arrOcuppations.push(obj);
        }

      });

      obj['occupations'] = arrOcuppations;
    } else {
      delete obj['occupations']
    }



    obj['_id'] = this.props.params.id



    console.log('JSON',(obj))


    const string = formatForGraphQL(obj);
    console.log('string',string)

    this.model.addCharacter(string , res => {
      console.log('res',res);
    });
  }

  handleDate(){
    $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  renderWands(wands){
    var string = "";
    if(wands.length === 0){
      return (
        <FormGroup id='wands' label="Wands" type='text' customClasses="col s12" />
      )
    }
    for(let i = 0; i < wands.length; i++){
      string += wands[i].dimension + "," + wands[i].tree+","+wands[i].magical_creature+"|";

    }

    return (
      <FormGroup id='wands' label="Wands" type='text' customClasses="col s12" defaultValue={string}/>
    )

  }

 renderOccupations(occupations){

    var string = "";
    if(occupations.length === 0){
      return (
        <FormGroup id='occupations' label="occupations" type='text' customClasses="col s12" />
      )
    }
    for(let i = 0; i < occupations.length; i++){
      string += occupations[i].name + ","

    }

    return (<FormGroup  id='occupations' label="occupations" type='text'
               customClasses="col s12"
               defaultValue={string}/>      )
  }

  render() {
    const props = this.props;
    return (<Form ref="form" customClasses="col s12" onSubmit={this.handleForm.bind(this)}>
    born: {JSON.stringify(props.data.born)}

      <Row>
        <FormGroup id='name' label="NAME" type='text' customClasses="col s6" defaultValue={props.data.name}/>
        <FormGroup id='full_name' label="FULL NAME" type='text' customClasses="col s6" defaultValue={props.data.full_name}/>
      </Row>

      <Row>
        <FormGroup id='birth_date' label="Birth Date" type='text' customClasses="col s6" handleDate={this.handleDate} defaultValue={props.data.birth_date}/>
        <FormGroup id='birth_address' label="Birth address" type='text' customClasses="col s6" defaultValue={props.data.birth_address}/>

      </Row>
      <Row>
        <FormGroup id='death_date' label="Date of death" type='text' customClasses="col s6" defaultValue={props.data.death_date} />
        <FormGroup id='death_address' label="Death address" type='text' customClasses="col s6" defaultValue={props.data.death_address}/>

      </Row>
      <Row>
        <FormGroup id='known_as' label="Known as" type='text' customClasses="col s6" defaultValue={props.data.known_as}/>
        <FormGroup id='hair_colour' label="Hair colour" type='text' customClasses="col s6" defaultValue={props.data.hair_colour}/>
      </Row>
      <Row>
        <FormGroup id='eye_colour' label="Eye colour" type='text' customClasses="col s6" defaultValue={props.data.eye_colour}/>
        <FormGroup id='skin_colour' label="Skin colour" type='text' customClasses="col s6" defaultValue={props.data.skin_colour}/>
      </Row>
      <Row>
        <FormGroup id='boggart' label="Boggart" type='text' customClasses="col s6" defaultValue={props.data.boggart}/>
        <FormGroup id='patronus' label="Patronus" type='text' customClasses="col s6" defaultValue={props.data.patronus}/>
      </Row>
      <Row>
      {this.renderOccupations(props.data.occupations)}

      </Row>
      <Row>
        <FormGroup id='house' label="House" type='text' customClasses="col s6" defaultValue={props.data.house}/>
        <FormGroup id='gender' label="Gender" type='text' customClasses="col s6" defaultValue={props.data.gender}/>
      </Row>

      <Row>
      {this.renderWands(props.data.wands)}
      <FormGroup id='actor' label="Actor" type='text' customClasses="col s12" defaultValue={props.data.actor}/>

      </Row>

      <Row>
        <FormGroup id='blood_status' label="Magic Blood" type='text' customClasses="col s6" defaultValue={props.data.blood_status}/>
        <FormGroup id='marital_status' label="Marital Status" type='text' customClasses="col s6" defaultValue={props.data.marital_status}/>
      </Row>

      <Row>
        <div className='col s6 offset-s9'>
        <Button customClasses='' type='submit'>SEND INFO</Button>
        </div>
      </Row>
    </Form>);
  }
}

RenderForm.propTypes = {
  data: PropTypes.object
};
