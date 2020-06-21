import React, { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';

import PlayPause from '../PlayPause/PlayPause';
import Video from '../Video/Video';
import VideoStatus from '../Video/videoStatus';

import styles from './player.css';
import { VideoProgress } from '../VideoProgress/VideoProgress';

const Player = () => {
    const videoElementRef = useRef(null);
    const [status, setStatus] = useState(VideoStatus.PAUSED);
    const [isHover, setIsHover] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleTimeUpdateThrottled = throttle(event => {
        event.target.currentTime && setCurrentTime(event.target.currentTime);
    }, 200);

    const handleVideoLoad = () => {
        setIsLoaded(true);
    };

    const handlePlayPauseClick = () => {
        switch (status) {
            case VideoStatus.PAUSED:
                playVideo();
                break;
            case VideoStatus.PLAYING:
                pauseVideo();
                break;
        }
    };

    const handleVideoKeyPress = target => {
        if (target.charCode === 13) {
            handlePlayPauseClick();
        }
    };

    const playVideo = () => {
        videoElementRef.current.play();
        setStatus(VideoStatus.PLAYING);
    };

    const pauseVideo = () => {
        videoElementRef.current.pause();
        setStatus(VideoStatus.PAUSED);
    };

    const handleVideoMouseOver = () => {
        setIsHover(true);
    };

    const handleVideoMouseLeave = () => {
        setIsHover(false);
    };

    const isPlaying = status === VideoStatus.PLAYING;
    const isUiHidden = !isHover && isPlaying;
    const skipToTime = time => {
        videoElementRef.current.currentTime = time;
    };

    return (
        <div className={styles.player}>
            <Video
                data-test-id="video"
                setRef={videoElementRef}
                onKeyPress={handleVideoKeyPress}
                onMouseOver={handleVideoMouseOver}
                onMouseLeave={handleVideoMouseLeave}
                onLoadedData={handleVideoLoad}
                onTimeUpdate={handleTimeUpdateThrottled}
            />
            <PlayPause
                isPlaying={isPlaying}
                onClick={handlePlayPauseClick}
                isUiHidden={isUiHidden}
            />
            <VideoProgress
                currentTime={currentTime}
                duration={
                    videoElementRef && videoElementRef.current
                        ? videoElementRef.current.duration
                        : 0
                }
                skipToTime={skipToTime}
                isUiHidden={isUiHidden}
                isLoaded={isLoaded}
            />
        </div>
    );
};

export default Player;
