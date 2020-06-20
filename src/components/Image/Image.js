import React, { useState, useEffect, useRef } from 'react';

import { IMAGE_PATH } from '../../shared/constants/assetPaths';

import styles from './image.css';

const Image = props => {
    const imageElementRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const url = `${IMAGE_PATH}${props.id}.jpg`;

    const checkVisibility = () => {
        if (isVisible) return;

        const { innerHeight } = window;
        const {
            top,
            left,
            bottom,
            right
        } = imageElementRef.current.getBoundingClientRect();

        if (
            top <= innerHeight &&
            bottom >= 0 &&
            left <= innerHeight &&
            right >= 0
        ) {
            setIsVisible(true);
        }
    };

    props.setMovedListener(checkVisibility);

    useEffect(() => {
        checkVisibility();

        window.addEventListener('resize', checkVisibility);
        window.addEventListener('scroll', checkVisibility);

        return () => {
            window.removeEventListener('resize', checkVisibility);
            window.removeEventListener('scroll', checkVisibility);
        };
    }, []);

    const handleLoad = () => {
        requestAnimationFrame(() => setIsLoaded(true));
    };

    const getImageBackgroundStyle = () => {
        return {
            backgroundImage: `url(${url})`
        };
    };

    const { alt, className } = props;

    const imageClassName = [
        styles.image,
        isLoaded && styles.imageLoaded,
        className && className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={imageClassName} ref={imageElementRef}>
            {isVisible && (
                <img
                    className={styles.imageImg}
                    src={url}
                    alt={alt}
                    onLoad={handleLoad}
                />
            )}
            <div
                className={styles.imageBackground}
                style={isLoaded ? getImageBackgroundStyle() : null}
            />
        </div>
    );
};

export default Image;
