import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//MY API key ; AIzaSyBSp_Z9AygNmo5rj617dAZrwrxyIHsu6ks

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.getLocation();
  }

  
  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(value => {
        this.setState({
          longitude: value.coords.longitude,
          latitude: value.coords.latitude
        });
        this.showInMap(value);
      }, this.errorHandling, options);
    } else {
      console.log("Geo Location not supported by browser");
    }
  }

  // Static maps
  // https://developers.google.com/maps/documentation/static-maps/intro
  // Places WS
  // https://developers.google.com/places/web-service/details
  // places JS
  // https://developers.google.com/places/javascript/
  // marker clustering
  // https://developers.google.com/maps/documentation/javascript/marker-clustering
  showInMap(pos) {
    const latlon = pos.coords.latitude + "," + pos.coords.longitude;
    const myLatLonChd = '-30.045143799999998,-51.232861099999997'

    // republica com lima
    const cruz = '-30.0377946,-51.2220254'

    // static working with markers
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${cruz}&zoom=18&size=600x400\
    &markers=size:tiny%7Ccolor:red%7Clabel:S%7C${cruz}\
    &&key=INSERT KEY HERE`

    //static generic working
    // const img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon +
    // "&zoom=13&size=500x400" +
    // "&sensor=false&key=INSERT KEY HERE";
    const map = document.getElementById("mapholder");
    map.innerHTML = "<img src='"+img_url+"'>";
}

  errorHandling(error) {
    if (error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
        default:
          console.warn('ERROR(' + error.code + '): ' + error.message);
          break;
      }
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactz</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h2>on lat {this.state.latitude}.</h2>
        <h2>on long {this.state.longitude}.</h2>

        <div id="mapholder"/>

      </div>
    );
  }
}

export default App;
