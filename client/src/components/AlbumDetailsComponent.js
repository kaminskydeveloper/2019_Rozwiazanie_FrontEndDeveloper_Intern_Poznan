import React from 'react';
import './styles/AlbumDetailsComponent.css';

export default function AlbumDetailsComponent(props) {
  const millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const durationArray = [];
  var sum = 0;
  return (
    <div>
      <h3>Popularity: {props.popularity}</h3>
      {props.tracks.map((element, index) => {
        durationArray.push(element.duration_ms);
        sum += element.duration_ms;

        return (
          <li key={index} className="tracksList">
            {element.name}{' '}
            <span className="track_duration">
              {millisToMinutesAndSeconds(element.duration_ms)}
            </span>
            <a
              href={element.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Listen on Spotify
            </a>
          </li>
        );
      })}
      <p className="totalDuration">
        Total Duration {millisToMinutesAndSeconds(sum)}
      </p>
    </div>
  );
}
