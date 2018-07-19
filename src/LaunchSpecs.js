import React, { Component } from 'react';
import Show from './Show';
class LaunchSpecs extends Component {

  render() {
    let {flight_number, mission_name, links, launch_success, details, rocket, launch_site} = this.props.launch

      return (
        <div className='launchSpecs'>
            <h1>{mission_name}</h1>
            <div className="missionImg">
              <img src={links.mission_patch_small} />
            </div>
            <div className="missionInfo">
              <p>Rocket: {rocket.rocket_name}</p>
              <p>Mission Successful: {launch_success.toString()}</p>
              <p>Launch site: {launch_site.site_name_long}</p>
              <p>Mission Details: {details}</p>
              <br/>
              <button className="ui button" onClick={() => this.props.missionClick(flight_number)}>Add Mission</button>
              <button className="ui button" onClick={() => this.props.goBack()}>Go Back</button>
            </div>
        </div>
    );
  }
}

export default LaunchSpecs;
