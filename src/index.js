import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './dropdown';
import './style.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      countryList: [],
      countryCode: '',
      stateList: []
    };
    this.listStates = this.listStates.bind(this);
  };
  
  sort(a,b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
      return 0;
  };

  getCountries() {
    fetch('https://country-api-grantglowacki834408.codeanyapp.com/countries').then(
      response => { 
    if (response.ok) {
      return response.json(); 
    }
    throw new Error('Request failed!');
    }, networkError => {
    console.log(networkError.message);
    }).then(jsonResponse => {
      let orderedCountries = jsonResponse;
      orderedCountries.sort(function (a,b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    this.setState({countryList: orderedCountries})});
  };

  listStates(cCode) {
    //console.log('hey');
    if (cCode === "") {
      this.setState({stateList: []});
      return;
    }
    let code = 'country=' + cCode;
    fetch('https://country-api-grantglowacki834408.codeanyapp.com/countries/' + cCode + '/states')
    .then((response) => response.json())
    .then((jsonResponse) => {
      let orderedStates = jsonResponse;
      orderedStates.sort(function (a,b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      this.setState({stateList: orderedStates});
     }).catch((error) => {alert(error);});
  };

  componentWillMount() {
    this.getCountries();
  };

  onChange = (event) => {
    this.listStates(event.target.value);
  };
  
  render() {
    
    return (
      <div>
        Country:
        <Dropdown name='Country' items={this.state.countryList} onChange={this.onChange}/>
        State:        
        <Dropdown name='State' items={this.state.stateList} />
      </div>
    );
  };
}

render(<App />, document.getElementById('root'));
