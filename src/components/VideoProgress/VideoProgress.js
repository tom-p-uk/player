import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './videoProgress.css';
import { getPercentage } from './getPercentage';
import { convertPercentageToNumber } from './convertPercentageToNumber';

export const VideoProgress = ({
    currentTime,
    duration,
    skipToTime = () => null,
    isUiHidden,
    innerWidth
}) => {
    const [currentTimeAsPercentage, setCurrentTimeAsPercentage] = useState(-1);

    useEffect(() => {
        setCurrentTimeAsPercentage(getPercentage(currentTime, duration));
    }, [currentTime]);

    return (
        <div
            className={styles.wrapper}
            onClick={({ pageX }) => {
                const percentage = getPercentage(pageX, window.innerWidth);
                skipToTime(convertPercentageToNumber(percentage, duration));
            }}
        >
            <span
                style={{
                    color: 'white',
                    transform: `translateX(${convertPercentageToNumber(
                        currentTimeAsPercentage,
                        innerWidth
                    )}px)`
                }}
            >
                |
            </span>
        </div>
    );
};

VideoProgress.propTypes = {
    currentTime: PropTypes.string,
    currentTimeFormatted: PropTypes.string,
    duration: PropTypes.number,
    durationFormatted: PropTypes.number,
    skipToTime: PropTypes.func,
    innerWidth: PropTypes.number
};
