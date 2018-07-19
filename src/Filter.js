import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import './App.css';

class Filter extends Component {


rocketTypeFilter = () => {
  return this.props.allRockets.map((rocket) => <option value={rocket}>{rocket}</option>)
}

render() {
  this.props.populateSelect()
  this.props.populateCustomers()

  const rocketsSelectObject = this.props.allRockets.map((rocket) => ({value: rocket, text: rocket}))
    return (
      <div className="filterStuff">

        <form className="inline">
          <label>Search Missions:</label>
          <input
            className="ui fluid category search filterStuff"
            placeholder="Search for..."
            value={this.props.query}
            onChange={this.props.handleSearch}
          />
        </form>

        <div className="inline">
        <label>Rocket Type:</label>
          <select className='ui search dropdown filterStuff' onChange={this.props.handleSelect}>
            <option value='All Rockets'>All Rockets</option>
            {this.rocketTypeFilter()}
          </select>
        </div>

        <div className="inline">
          <label>Customers:</label>
          <select className='ui search dropdown filterStuff' onChange={this.props.handleCustomer}>
            <option value='All Customers'>All Customers</option>
            {this.props.customerFilter()}
          </select>
        </div>

        <div className="inline">
            <label className="labelCheck">
              Successful Missions:
            </label>
            <Checkbox toggle
              className="checkBOX"
              name="successfulOnly"
              type="checkbox"
              checked={this.props.successfulOnly}
              onChange={this.props.handleCheck}
            />
        </div>
      </div>
    );
  }
}


export default Filter;
