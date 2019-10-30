import React, { Component } from "react";
import "./App.css";

import "./sass/app.scss";

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "London",
      isLoading: true
    };
  }

  updateWeather() {
    const { cityName } = this.state;
    const URL = `https://dashboard.heroku.com/apps/gentle-meadow-41169/api/test`;
    const options = {
      cityName: cityName
    };
    axios
      .post(URL, options)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success) {
          const weatherData = JSON.parse(data.data);
          this.setState({
            isLoading: false,
            temp_c: weatherData.current.temperature,
            isDay: weatherData.current.is_day,
            text: weatherData.current.weather_descriptions[0],
            iconURL: weatherData.current.weather_icons[0],
            forecastdays: weatherData.forecast.forecastday
          });
        } else {
          console.error("Cannot fetch Weather Data from API, ", data.message);
        }
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const {
      isLoading,
      cityName,
      temp_c,
      isDay,
      text,
      iconURL,
      forecastdays
    } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading && (
            <div className="top-section">
              <TopSection
                location={cityName}
                temp_c={temp_c}
                isDay={isDay}
                text={text}
                iconURL={iconURL}
                eventEmitter={this.props.eventEmitter}
              />
            </div>
          )}
          <div className="bottom-section">
            <BottomSection forecastdays={forecastdays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
