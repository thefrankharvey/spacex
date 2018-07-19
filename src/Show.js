import React, { Component } from 'react';
import './App.css';

class Show extends Component {

  render() {
    let {flight_number, mission_name, links, launch_success, details, rocket} = this.props.launch

      return (
        <div className='stuffs'>
        <h1>{mission_name}</h1>
        <img src={links.mission_patch_small} onClick={() => this.props.clickedCheck(flight_number)}/>
        <br/>
        </div>
      );

  }
}

export default Show;
