import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Dropdown extends Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.items == nextProps.items) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    let itemList = this.props.items.map((item) => <option value={item.code}>{item.name}</option>);
    return (
    
      <div>
      <select onChange={this.props.onChange}>
        <option value="">Choose a {this.props.name}</option>
        {itemList}
      </select>
      
      </div>
    );
  }
}