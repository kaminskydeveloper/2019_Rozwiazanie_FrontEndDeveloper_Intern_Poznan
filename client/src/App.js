import React, { Component } from 'react';
import AlbumComponent from './components/AlbumComponent';

import querystring from 'query-string';

import './App.css';
import './AppAlbumContainer.css';

const parsedAccessToken = querystring.parse(window.location.search);
const accessToken = parsedAccessToken.access_token;

class App extends Component {
  state = {
    albums: [],
  };

  searchForAlbums = async event => {
    event.preventDefault();

    const albumName = event.target.elements.albumName.value;

    const api_call = await fetch(
      `https://api.spotify.com/v1/search?q=album%3A${albumName}&type=album`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await api_call.json();
    this.setState({ albums: data.albums.items });

    document.querySelector('input').value = '';
  };

  render() {
    const albumsList = this.state.albums.map(element => (
      <AlbumComponent
        key={element.id}
        name={element.name}
        image={element.images[1].url}
        artist={element.artists[0].name}
        release_date={element.release_date}
        total_tracks={element.total_tracks}
        id={element.id}
        href={element.href}
      />
    ));

    if (accessToken) {
      return (
        <div className="App">
          <header>
            <h1>Allegro Internship Recruitment Task - Spotify API </h1>
            <form onSubmit={this.searchForAlbums}>
              <p>
                {' '}
                <label>
                  <input
                    type="text"
                    name="albumName"
                    placeholder="Album name..."
                  />
                </label>
                <button
                  type="submit"
                  value="Submit"
                  className="submitFormButton"
                >
                  Submit
                </button>
              </p>
            </form>
            {this.state.albums.length > 1 ? (
              <div>
                {' '}
                <p>
                  <button
                    className="sortButton"
                    onClick={() => {
                      this.setState({
                        albums: this.state.albums.sort((a, b) => {
                          if (a.name < b.name) return -1;
                          if (a.name > b.name) return 1;
                          return 0;
                        }),
                      });
                    }}
                  >
                    Sort Alpha
                  </button>

                  <button
                    className="sortButton"
                    onClick={() => {
                      this.setState({
                        albums: this.state.albums.sort((a, b) => {
                          return (
                            new Date(b.release_date) - new Date(a.release_date)
                          );
                        }),
                      });
                    }}
                  >
                    Sort by date
                  </button>
                </p>
              </div>
            ) : (
              console.log()
            )}
          </header>
          <div className="albumContainer"> {albumsList}</div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h2>Hello it's my Allegro Internship Recruitment Task</h2>
          <div className="centered">
            {' '}
            <button
              className="signIn"
              onClick={() => (window.location = 'http://localhost:8000/login')}
            >
              Sign In with Spotify
            </button>
          </div>
        </div>
      );
    }
  }
}

export default App;
