import React from "react";
import PropTypes from 'prop-types';

export default class Weather extends React.Component {
  static propTypes = {
    location: PropTypes.string,
    temp_c: PropTypes.string,
    text: PropTypes.string,
    iconURL: PropTypes.string,
  }

  static defaultProps = {
    location: '',
    temp_c: 0,
    text: '',
    iconURL: '',
  }


  render() {
    const {
      location,
      temp_c,
      text,
      iconURL,
    } = this.props;

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
