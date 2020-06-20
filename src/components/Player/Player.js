import React, { useState, useRef } from 'react';

import PlayPause from '../PlayPause/PlayPause';
import Video from '../Video/Video';
import VideoStatus from '../Video/videoStatus';

import styles from './player.css';

const Player = () => {
    const videoElementRef = useRef(null);
    const [status, setStatus] = useState(VideoStatus.PAUSED);
    const [isHover, setIsHover] = useState(false);

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

    return (
        <div className={styles.player}>
            <Video
                setRef={videoElementRef}
                onKeyPress={handleVideoKeyPress}
                onMouseOver={handleVideoMouseOver}
                onMouseLeave={handleVideoMouseLeave}
            />
            <PlayPause
                isPlaying={isPlaying}
                onClick={handlePlayPauseClick}
                isUiHidden={isUiHidden}
            />
        </div>
    );
};

export default Player;
