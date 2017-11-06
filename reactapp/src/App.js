import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor() {
    super ();
      this.state = {
        city: [],
      };
    }

    componentWillMount() {
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=Rennes&lang=fr&units=metric&appid=dfaee76e889bd1d232719d5b18c12009',{
        mode: 'cors'
      })
        .then(res => res.json())
        .then(resJson => console.log(resJson))
    }
  
  render() {

    return (

        <div className="App-intro"> 
          {this.state.city}
        </div>

    );
  }
}

export default App;
