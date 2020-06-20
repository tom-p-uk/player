import React from 'react';

import Logo from '../Logo/Logo';
import Image from '../Image/Image';

import styles from './tile.css';

const Tile = ({
    id,
    isPromo,
    title,
    setMovedListener,
    railId,
    activeTileId
}) => {
    const className = [
        styles.tile,
        isPromo && styles.tilePromo,
        id === activeTileId && styles.tileActive
    ]
        .filter(Boolean)
        .join(' ');

    const href = `/${railId}/${id}`;

    return (
        <a href={href} className={className}>
            <Logo className={styles.tileLogo} />
            <Image
                id={id}
                alt={title}
                className={styles.tileImage}
                setMovedListener={setMovedListener}
            />
            {!isPromo && (
                <div className={styles.tileText}>
                    <h4 className={styles.tileTitle}>{title}</h4>
                </div>
            )}
        </a>
    );
};

export default Tile;
