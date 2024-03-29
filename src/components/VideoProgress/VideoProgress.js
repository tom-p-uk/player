import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './videoProgress.css';
import { getPercentage } from './utils/getPercentage';
import { convertPercentageToNumber } from './utils/convertPercentageToNumber';
import { getFormattedTime } from './utils/getFormattedTime';

export const VideoProgress = ({
    currentTime,
    duration,
    isUiHidden,
    isLoaded,
    skipToTime
}) => {
    if (!isLoaded) {
        return null;
    }

    const [currentTimeAsPercentage, setCurrentTimeAsPercentage] = useState(0);

    useEffect(() => {
        setCurrentTimeAsPercentage(getPercentage(currentTime, duration));
    }, [currentTime]);

    return (
        <div
            className={`${styles.videoProgressWrapper} ${isUiHidden &&
                styles.hidden}`}
            data-test-id="video-progress-wrapper"
        >
            <span className={styles.currentTime} data-test-id="current-time">
                {getFormattedTime(currentTime)}
            </span>
            <input
                className={styles.slider}
                type="range"
                min={0}
                max={100}
                value={currentTimeAsPercentage}
                step={0.1}
                onChange={event => {
                    skipToTime(
                        convertPercentageToNumber(
                            parseFloat(event.target.value),
                            duration
                        )
                    );
                }}
            />
            <span className={styles.duration} data-test-id="duration">
                {getFormattedTime(duration)}
            </span>
        </div>
    );
};

VideoProgress.propTypes = {
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    isUiHidden: PropTypes.bool,
    isLoaded: PropTypes.bool,
    skipToTime: PropTypes.func
};
