import React, { useEffect, useState } from 'react';

function YouTubeVideos() {
  const API_Key = 'AIzaSyBFgcwhXljcWi6Nu6y8NymZJRwW8Dq4g6Q';
  const Channel_ID = 'UCPsopTKQfSgW9XdYkKA6Gdw';
  const Max_Results = 10;
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${Channel_ID}&maxResults=${Max_Results}&key=${API_Key}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the data received from the API
        if (data.items) {
          setVideoList(data.items);
        } else {
          console.log('Invalid API key or channel ID.');
        }
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <div>
      {videoList.length > 0 ? (
        videoList.map((item) => (
          <div className="yvideo-box" key={item.id.videoId}>
            <iframe
              width="280"
              height="150"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h4>{item.snippet.title}</h4>
          </div>
        ))
      ) : (
        <p className="error">No videos found.</p>
      )}
    </div>
  );
}

export default YouTubeVideos;
