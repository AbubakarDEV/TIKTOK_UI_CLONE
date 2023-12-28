import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (autoplay) {
      // videoRef.current.play();
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };


  const handleProgressChange = () => {
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleProgressBarClick = (e) => {
    const clickedTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = clickedTime;
  };

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        onTimeUpdate={handleProgressChange}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}

        loop
        src={url}
        muted="muted"
        poster="./img2.jpg"
      >

      </video>
      <div
        onClick={handleProgressBarClick}
        className='progressBarCnt'
      >
        <div
          style={{
            width: `${progress}%`,
            height: '8px',
            background: 'red',
          }}
        />
      </div>

      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
