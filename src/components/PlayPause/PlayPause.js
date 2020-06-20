import React from 'react';

import IconPause from './IconPause';
import IconPlay from './IconPlay';

import styles from './playPause.css';

const PlayPause = props => {
    const playPauseClassName = [
        styles.playPauseButton,
        props.isUiHidden && styles.playPauseButtonHidden
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={playPauseClassName} onClick={props.onClick}>
            {props.isPlaying ? <IconPause /> : <IconPlay />}
        </button>
    );
};

export default PlayPause;
