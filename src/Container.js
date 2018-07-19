import React, { Component } from 'react';
import Show from './Show';
class Container extends Component {

  render() {
    return (
      <div>
        <div className='container'>
          {this.props.launches.map(launch => < Show launch={launch} clickedCheck={this.props.clickedCheck}/>)}
        </div>
      </div>
    );
  }
}

export default Container;
