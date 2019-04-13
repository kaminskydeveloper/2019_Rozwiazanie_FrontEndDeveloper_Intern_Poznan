import React, { Component } from 'react';
import AlbumDetailsComponent from './AlbumDetailsComponent';
import './styles/AlbumComponent.css';

import querystring from 'query-string';

const parsedAccessToken = querystring.parse(window.location.search);
const accessToken = parsedAccessToken.access_token;

export default class AlbumComponent extends Component {
  state = {
    showed: false,
    details: [],
  };

  toggleDetails = async () => {
    let isShowed = this.state.showed;
    this.setState({ showed: !isShowed });
  };

  componentDidMount() {
    fetch(`${this.props.href}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => this.setState({ details: data }));
  }

  render() {
    if (!this.state.showed) {
      return (
        <div>
          <h3>{this.props.name}</h3>
          <p>Artist: {this.props.artist}</p>
          <p>Release Date: {this.props.release_date}</p>
          <p>Total Tracks: {this.props.total_tracks}</p>
          <img src={this.props.image} alt="" />
          <p className="clickForDetails" onClick={this.toggleDetails}>
            Click for details
          </p>
        </div>
      );
    } else {
      console.log(this.state);
      return (
        <div>
          <AlbumDetailsComponent
            popularity={this.state.details.popularity}
            tracks={this.state.details.tracks.items}
          />
          <p className="clickForDetails" onClick={this.toggleDetails}>
            Go Back
          </p>
        </div>
      );
    }
  }
}
