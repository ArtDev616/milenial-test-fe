import React from "react";

export default class Weather extends React.Component {
  render() {
    const { location, temp_c, text, iconURL } = this.props;

    return (
      <div className="weather-container">
        <div className="header">{location}</div>
        <div className="inner-container">
          <div className="image">
            <img alt={location} src={iconURL} />
          </div>
          <div className="current-weather">{temp_c}°</div>
        </div>
        <div className="footer">{text}</div>
      </div>
    );
  }
}
