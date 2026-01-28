import React, { useMemo } from 'react';
import styles from './Events.module.css';

export default function SkyBackground() {
    const stars = useMemo(() =>
        Array.from({ length: 200 }).map((_, i) => ({
            key: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 5}s`,
        })), []
    );

    const lanterns = useMemo(() =>
        Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 15 + 10;
            return {
                key: i,
                top: `${Math.random() * 90 + 5}%`,
                left: `${Math.random() * 95 + 2}%`,
                width: `${size}px`,
                height: `${size * 1.3}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
            };
        }), []
    );

    return (
        <div className={styles.skyScene}>
            <div className={styles.moon} />
            <div className={styles.mountains} />
            <div className={styles.stars}>
                {stars.map((star) => (
                    <div
                        key={star.key}
                        className={styles.star}
                        style={{
                            top: star.top,
                            left: star.left,
                            animationDuration: star.animationDuration,
                            animationDelay: star.animationDelay,
                        }}
                    />
                ))}
            </div>

            <div className={styles.lanterns}>
                {lanterns.map((lantern) => (
                    <div
                        key={lantern.key}
                        className={styles.lantern}
                        style={{
                            top: lantern.top,
                            left: lantern.left,
                            width: lantern.width,
                            height: lantern.height,
                            animationDuration: lantern.animationDuration,
                            animationDelay: lantern.animationDelay,
                        }}
                    >
                        <div className={styles.lanternBody} />
                    </div>
                ))}
            </div>
        </div>
    );
}
