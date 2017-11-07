import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor() {
    super ();
      this.state = {
        city: 'Rennes',
        temp: ''
      };
    }

    componentWillMount() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Rennes&lang=fr&units=metric&appid=dfaee76e889bd1d232719d5b18c12009',{
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          const temp = data.main.temp;
          this.setState({temp});
        });
    }
  
  render() {

    return (

        <div className="App-intro"> 

          <div className="City">
            {this.state.city}
          </div>

          <div className= "Temp">
            {this.state.temp}
          </div>
        </div>

    );
  }
}

export default App;
