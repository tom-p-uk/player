import React, { useState, useEffect, useRef } from 'react';
import createNextRailState from './createNextRailState';
import Tile from '../Tile/Tile';
import styles from './rail.css';

function Rail({ id, title, tiles, activeTileId }) {
    const movedListeners = useRef([]);
    const trackElementRef = useRef(null);
    const [state, setState] = useState(
        createNextRailState({
            tileCount: tiles.length
        })
    );
    const {
        prevIndex,
        nextIndex,
        trackX,
        tileCount,
        isAtLeftEdge,
        isAtRightEdge
    } = state;

    const proxySetState = nextState =>
        setState(createNextRailState(state, nextState));
    const setMovedListener = listener => {
        movedListeners.current.push(listener);
    };
    const updateDimensions = () => {
        const trackElement = trackElementRef.current;
        const tiles = Array.from(trackElement.children);
        const trackPadding = parseInt(
            window.getComputedStyle(trackElement).paddingLeft
        );
        const tileWidths = tiles.map(tileElement => {
            const { width, marginRight } = window.getComputedStyle(tileElement);
            return parseInt(width) + parseInt(marginRight);
        });
        proxySetState({
            tileWidths,
            trackPadding,
            viewportWidth: window.innerWidth
        });
    };

    const getRailTrackStyle = () => ({
        transform: `translateX(${trackX}px)`
    });
    const handleButtonLeftClick = () =>
        proxySetState({
            index: Math.max(0, prevIndex)
        });
    const handleButtonRightClick = () =>
        proxySetState({
            index: Math.min(nextIndex, tileCount - 1)
        });
    const handleTransitionEnd = ({ propertyName, target }) => {
        if (target !== trackElementRef.current || propertyName !== 'transform')
            return;
        movedListeners.current.forEach(listener => listener());
    };

    const railClassName = [
        styles.rail,
        isAtLeftEdge && styles.railAtLeftEdge,
        isAtRightEdge && styles.railAtRightEdge
    ]
        .filter(Boolean)
        .join(' ');

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', () => updateDimensions());
        return () =>
            window.removeEventListener('resize', () => updateDimensions());
    }, []);

    return (
        <div className={railClassName}>
            <h2 className={styles.railHeading}>{title}</h2>
            <div
                className={styles.railTrack}
                ref={trackElementRef}
                style={getRailTrackStyle()}
                onTransitionEnd={handleTransitionEnd}
            >
                {tiles.map(tile => (
                    <Tile
                        {...tile}
                        railId={id}
                        key={tile.id}
                        activeTileId={activeTileId}
                        setMovedListener={setMovedListener}
                    />
                ))}
            </div>
            <button
                className={styles.railButtonLeft}
                onClick={handleButtonLeftClick}
            />
            <button
                className={styles.railButtonRight}
                onClick={handleButtonRightClick}
            />
        </div>
    );
}

export default Rail;
