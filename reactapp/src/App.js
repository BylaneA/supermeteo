import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor() {
    super ();
      this.state = {
        city: 'Rennes',
        country:'',
        date:'',
        temp: '',
        temp_min:'',
        temp_max:'',
        text:''
      };
      this.goToThisCity = this.goToThisCity.bind(this);
      this.fonctionQuiFetch = this.fonctionQuiFetch.bind(this)
  }

  fonctionQuiFetch() {
    fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+this.state.city+"%2Ccn%22)%20and%20u%3D%22c%22%0A&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",{
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        const country = data.query.results.channel.location.country;
        this.setState({country});
         const date = data.query.results.channel.item.forecast[0].date;
        this.setState({date});
        const temp = data.query.results.channel.item.condition.temp;
        this.setState({temp});
        const temp_min = data.query.results.channel.item.forecast[0].low;
        this.setState({temp_min});
        const temp_max = data.query.results.channel.item.forecast[0].high;
        this.setState({temp_max});
        const text = data.query.results.channel.item.forecast[0].text;
        this.setState({text});
        
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

          <div className="Container">

            <div className="Infos">
              <div className="Ville">
              {this.state.city}
              </div>
              <div className="Pays">
              {this.state.country}
              </div>
              <div className="Temp">
              {this.state.temp}°C
              </div>
              <div className="Date">
              {this.state.date}
              </div>
            </div>

            <div className="Infos2">
              <div className="Text">
                {this.state.text}
              </div>
              <div className="Min">
                Min: {this.state.temp_min}°C
              </div>
              <div className="Max">
                Max: {this.state.temp_max}°C
              </div>
            </div>

          </div>

        </div>
    );
  }
}
export default App;
