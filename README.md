<h2 align="center">SpaceXplorer</h2>

![React](https://img.shields.io/badge/react.js-16.3.2-brightgreen.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview
Find and explore all of the SpaceX launches to date, including mission details, mission patch, customers, and rocket types.

<p align="center"><img width=95% src="https://drive.google.com/uc?id=1ddnFetNVPWQakXL2G5zqcr3aI_Vlo3_P"></p>

## Fetch request
This app populates state with data from the SpaceX API through this fetch request in App.js

```javascript
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
```
<br>

## Install
This app requires React and Semantic ui with Semantic ui React.  

<br>

https://semantic-ui.com/introduction/getting-started.html  

https://react.semantic-ui.com/introduction  

https://www.npmjs.com/package/react  

https://www.npmjs.com/package/react-dom  

<br>

After installing dependencies, run a SpaceXplorer local server. From the app directory...
```javascript
npm start
```

<br>

## Search
Using the 'Search Missions' bar, type a name to search by mission name.
<p align="center"><img width=95% src="https://drive.google.com/uc?id=1M2n8N8uxu58JvCoso3pKxfg4-rr87XD9"></p>

<br>

## Mission Details
Click on the mission patch to display launch details.
<p align="center"><img width=95% src="https://drive.google.com/uc?id=1RSgLJRbI6IRsOiaf_wrE4tNMzG7h13B4"></p>

<br>

## Filter by customer
Filter by customer with through the dropdown in the select menu.
<p align="center"><img width=95% src="https://drive.google.com/uc?id=1eyEsBBjXZ0mKShJ165NUf7gxbLKUA9su"></p>

The below function filters by customer.
```javascript
handleCustomer = (e) => {
  if(e.target.value === 'All Customers') {
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
```

<br>

## Sort successful missions
Filter out unsuccessful missions with the switch under the search bar.
<p align="center"><img width=95% src="https://drive.google.com/uc?id=1yXRUhKSl2KC6tXS6IFnR-2PC1dJFgUg6"></p>

The below function handles this filter.
```javascript
filteredMissions = () => {
  return this.state.filteredCustomers.filter((l) => this.state.filteredRockets.includes(l)).filter((launch) =>
      (!this.state.successfulOnly || this.state.successfulOnly && launch.launch_success))
      .filter((launch) => launch.mission_name.toLowerCase().includes(this.state.query.toLowerCase()))
}
```

<br>

## License
MIT

<br>
