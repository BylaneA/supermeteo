import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor() {
    super ();
      this.state = {
        city: 'Rennes',
        temp: ''
      };
      this.goToThisCity = this.goToThisCity.bind(this);
      this.fonctionQuiFetch = this.fonctionQuiFetch.bind(this)
  }

  fonctionQuiFetch() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&lang=fr&units=metric&appid=dfaee76e889bd1d232719d5b18c12009",{
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const temp = data.main.temp;
          this.setState({temp});
        });
  }

  componentWillMount() {
      this.fonctionQuiFetch();
  }

  goToThisCity(event) {
    event.preventDefault();
    const city = this.cityInput.value;

    this.setState({city}, () => this.fonctionQuiFetch());
  };

  render() {

    return (

        <div className="App-intro"> 

          <form className="Formulaire" onSubmit={(e) => this.goToThisCity(e)}>

            <input type="text" placeholder="Ville" required ref={(input) => {this.cityInput = input}} />
           
            <button type="submit">Let's see</button>

          </form> 

          <div className="City">
            {this.state.city}
          </div>

          <div className="Temperature">
            {this.state.temp}
          </div>

        </div>

    );
  }
}

export default App;
