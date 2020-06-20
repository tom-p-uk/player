import React from 'react';

import { VIDEO_PATH } from '../../shared/constants/assetPaths';

import styles from './video.css';

const Video = props => {
    const url = `${VIDEO_PATH}dazn.mp4`;

    return (
        <video
            tabIndex={0}
            className={styles.video}
            src={url}
            onKeyPress={props.onKeyPress}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
            ref={props.setRef}
        />
    );
};

export default Video;
