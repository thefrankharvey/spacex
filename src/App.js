import React, { Component } from 'react';
import launch from './launch.jpg';
import logo from './logo.png';
import Container from './Container';
import Filter from './Filter';
import Missions from './Missions';
import LaunchSpecs from './LaunchSpecs';
import './App.css';

class App extends Component {

  state = {
    launches: [],
    successfulOnly: false,
    myMissions: [],
    currentMission: [],
    query: '',
    clicked: false,
    rocketType: '',
    filteredRockets: [],
    filteredLaunches: [],
    filteredCustomers: [],
    allCustomers: [],
    allRockets: []
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/')
    .then(x => x.json())
    .then((launchData) => {
      this.setState({
            launches: launchData,
            filteredCustomers: launchData,
            filteredRockets: launchData
        });
    })
  }

  populateSelect = () => {
    let rockets = this.state.launches.map((rocket) => rocket.rocket.rocket_name)
    rockets.forEach((rocket) => {
      if(!this.state.allRockets.includes(rocket)){
        this.setState({
          allRockets: [...this.state.allRockets, rocket]
        })
      }
    })
  }

// componentDidUpdate() {
//   this.filteredMissions()
// }

  filteredMissions = () => {
    console.log("filtering")
    return this.state.filteredCustomers.filter((l) => this.state.filteredRockets.includes(l)).filter((launch) =>
    // this.state.filteredRockets.filter((launch) =>
        (!this.state.successfulOnly || this.state.successfulOnly && launch.launch_success))
        .filter((launch) => launch.mission_name.toLowerCase().includes(this.state.query.toLowerCase()))
  }

  handleCheck = () => {
      this.setState({
        successfulOnly: !this.state.successfulOnly
      })
  }

  handleSearch = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  handleSelect = (e) => {
    if(e.target.value === 'All Rockets') {
      this.setState({
        filteredRockets: this.state.launches
      })
    } else {
      const differentRockets = this.state.launches.filter((rocket) => rocket.rocket.rocket_name === e.target.value)
      this.setState({
        filteredRockets: differentRockets
      })
    }
  }



  handleCustomer = (e) => {
    if(e.target.value === 'All Customers') {
      console.log("WOOOOO BITCHES")
      this.setState({
        filteredCustomers: this.state.launches
      })
    } else {
    let differentCustomers = []
    this.state.launches.forEach((launch) => {
      launch.rocket.second_stage.payloads.forEach((data) => {
        if (data.customers.includes(e.target.value)) {
          differentCustomers.push(launch)
        }
      })
    })

      this.setState({
        filteredCustomers: differentCustomers
      })
    }
  }

  populateCustomers = () => {
    let customer = this.state.launches.map(
      (launch) => launch.rocket.second_stage.payloads.map((data) => data.customers))
      function flatten(arr) {
       return arr.reduce(function (flat, toFlatten) {
         return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
       }, []);
      }

    let flatCustomer = flatten(customer)

    flatCustomer.forEach((customer) => {
      if(!this.state.allCustomers.includes(customer)){
        this.setState({
          allCustomers: [...this.state.allCustomers, customer]
        })
      }
    })
  }

  customerFilter = () => {
    return this.state.allCustomers.map((customer) => <option value={customer}>{customer}</option>)
  }

  missionClick = (findFlightNum) => {
    const removeLaunch = this.state.launches.filter(launch => launch.flight_number !== findFlightNum)
    const addLaunch = this.state.launches.find(launch => launch.flight_number === findFlightNum)
    this.setState({
      launches: removeLaunch,
      myMissions: [...this.state.myMissions, addLaunch]
    })
  }

  missionRemove = (findFlightNum) => {
    const removeLaunch = this.state.myMissions.filter(launch => launch.flight_number !== findFlightNum)
    const addLaunch = this.state.myMissions.find(launch => launch.flight_number === findFlightNum)
    this.setState({
      launches: [...this.state.launches, addLaunch],
      myMissions: removeLaunch
    })
  }

  clickedCheck = (id) => {
    let checkMission = this.state.launches.find((mission) => mission.flight_number === id)
    this.setState({
      clicked: !this.state.clicked,
      currentMission: checkMission
    })
  }

  goBack = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    // console.log(this.state.allCustomers)
    if(!this.state.clicked){
      return (
        <div className="App">
          <header>
          </header>
          <img src={logo} className='LOGO'/>
          <img src={launch} className='bg'/>

          < Filter
            successfulOnly={this.state.successfulOnly}
            handleCheck={this.handleCheck}
            launches={this.state.launches}
            handleSelect={this.handleSelect}
            customerFilter={this.customerFilter}
            populateCustomers={this.populateCustomers}
            handleCustomer={this.handleCustomer}
            handleSearch={this.handleSearch}
            query={this.state.query}
            allRockets={this.state.allRockets}
            populateSelect={this.populateSelect}
          />

          <div className='BREAK'></div>

          < Missions
            myMissions={this.state.myMissions}
            missionRemove={this.missionRemove}
          />

          < Container
            launches={this.filteredMissions()}
            clickedCheck={this.clickedCheck}
            missionRemove={this.missionRemove}
            myMissions={this.state.MyMissions}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          < LaunchSpecs
              launch={this.state.currentMission}
              missionClick={this.missionClick}
              goBack={this.goBack}
          />
        </div>
      )
    }

  }
}

export default App;
