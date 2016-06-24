import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


class FormGroup extends Component {
  constructor(props){
    super(props);
    this.state = { value: this.props.defaultValue};
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    this.props.handleDate()
  }

  onChange(e){
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const classes = classnames(
      {
       'input-field ': true,
       'datepicker': this.props.type === 'date'
      },
      this.props.customClasses
    );

    const labelClass = classnames(
      {
        'active': this.props.defaultValue !== ''
      }
    );
    const inputClasses = this.props.type === 'date' ? 'datepicker' : 'validate';
    return (
      <div className={classes}>
          <input id={this.props.id}
                 type={this.props.type}
                 className={inputClasses}
                 autoComplete={this.props.autoComplete}
                 defaultValue={this.state.value}
                 onChange={this.onChange}/>
          <label for={this.props.id} className={labelClass}>{this.props.label}</label>
      </div>
    );
  }
}

FormGroup.defaultProps = {
  autoComplete: 'off',
  customClasses: '',
  id: '',
  label: '',
  type:'text',
  defaultValue:'',
  handleDate: function(){}
}

FormGroup.propTypes = {
  autoComplete: React.PropTypes.string,
  customClasses: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  type:React.PropTypes.string,
  defaultValue: React.PropTypes.string
}

export default FormGroup
